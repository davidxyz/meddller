require 'Nokogiri'
require 'open-uri'
class MicropostsController < ApplicationController
  before_filter :signed_in_user, only: [:new,:create, :destroy, :increment]
  before_filter :correct_user, only: :destroy
  def index
  end
  def show_urls
    srcs=[]
    valid=true
    if !params[:urls].nil? and URI::DEFAULT_PARSER.regexp[:ABS_URI].match(params[:urls])
      doc = Nokogiri::HTML(open(params[:urls]))
      srcs=[]
      doc.css('img').each {|image|
        srcs<<image[:src]
      }
    else
      valid=false
    end
    respond_to do |format|
      format.json { render :json => { :urls => srcs, valid: valid} }
    end
  end
  def hall_of_fame# best posts of all time
  end
  def popularposts# best posts in last 24 hours
  end
  def risingposts# rising posts in last 5 hours
  end
  def newposts# newest posts in last 5 hours
  end
  def new
    @micropost =current_user.microposts.build
  end
  def new2
    @micropost = current_user.microposts.build
  end
  def new3
    @micropost=current_user.microposts.build
  end
  def increment
    if params[:type]=="upvote"
      @micropost=Micropost.find(params[:id])
      @type=current_user.have_I_liked_or_not?(@micropost,"micropost")
      if @type==false #make a new relationship
        current_user.like!(@micropost,"micropost")
        @micropost.user.inc
        @micropost.inc
      elsif @type=="downvote"
        current_user.neutral!(@micropost,"micropost")
        @micropost.user.dec
        @micropost.dec
      elsif @type=="upvote"
        #do nothing
      end
    elsif params[:type]=="downvote"
    @micropost=Micropost.find(params[:id])
      @type=current_user.have_I_liked_or_not?(@micropost,"micropost")
      if @type==false#make a new relationship
        current_user.hate!(@micropost,"micropost")
        @micropost.user.dec
        @micropost.dec
      elsif @type=="upvote"
        current_user.neutral!(@micropost,"micropost")
        @micropost.user.inc
        @micropost.inc
      elsif @type=="downvote"
        # do nothing
      end
    end#else someone is tamepring with he app and nothing happens
  respond_to do |format|
    format.json { render :json => { user_meds: @micropost.user.meds,micro_meds: @micropost.meds, type: @type} }
  end
  end
  def show
    @micropost=Micropost.find(params[:id])
    @comments=@micropost.comment_threads.paginate(page: params[:page])

    @comment=Comment.build_from( @micropost, current_user.id, " " )
    if signed_in? 
    @timeleft=user_time_left
    else
      @timeleft=0
    end
  end
  def create
    @medchannel=nil
    begin
    @medchannel=Medchannel.find_by_name(params[:micropost][:medchannel])
    rescue
      @medchannel=Medchannel.find(1);
    end
    params[:micropost][:medchannel]=@medchannel
    @micropost=params[:micropost]

    @micropost =current_user.microposts.build(@micropost)
    if @micropost.save
      flash[:success]= "Micropost created!"
     
      redirect_to root_path
    else
      # dont need @feed_items=[]
      render 'new'
    end
  end
  def destroy
    @micropost.destroy
    redirect_back_or root_path
  end
  private
    def correct_user
      @micropost = current_user.microposts.find_by_id(params[:id])
      redirect_to root_path if @micropost.nil?
    end
end