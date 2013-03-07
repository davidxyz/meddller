require 'Nokogiri'
require 'open-uri'
class MicropostsController < ApplicationController
  before_filter :signed_in_user, only: [:new,:create, :destroy, :increment,:repost]
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
  #have to incoporate some type of user controls so they can get more from their fee
  def hall_of_fame# best posts of all time
    begin
    @microposts=Micropost.order("meds DESC").limit(10)
    rescue
      @microposts=[]
    end
  end
  def popularposts# best posts in last 18 hours
    begin
      @microposts=Micropost.where(:created_at => (1.days.ago.to_date)..(Time.now.to_date)).order("meds DESC")
    rescue 
      @microposts=[]
    end
  end
  def risingposts# rising posts in algorithm
    begin
    @microposts=Micropost.where(:created_at => (4.hours.ago.to_date)..(Time.now.to_date)).order("meds DESC")#automatically gives created at descending order
    rescue
      @microposts=[]
    end
  end
  def newposts# newest posts in last 5 hours
    begin
    @microposts=Micropost.all#automatically gives created at descending order
    rescue
      @microposts=[]
    end
  end
  def repost#basically copies and attributes to original user
    micropost=Micropost.find(params[:id])
    channel=Medchannel.find_by_name(params[:medchannel])
    begin
    channel=Medchannel.create(name: params[:medchannel]) if channel.nil?
    cond1=micropost.in_channel?(channel)
    cond2=current_user.reposted_this?(micropost)
    if !cond1 and !cond2
      current_user.repost!(channel,micropost)
      respond_to do |format|
      format.json { render :json => { :valid=>true} }
      end
    else
      reason="can't repost to a channel that post is already in" if cond1
      reason="you have already reposted this" if cond2
      respond_to do |format|
      format.json { render :json => { :valid=>false,:reason=>reason}}
      end
    end
    rescue
      respond_to do |format|
      format.json { render :json => { :valid=>false,:reason=>"can only repost to a valid channel"} }
      end
    end   
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
    @medchannel=Medchannel.find_by_name(params[:micropost][:medchannel])
    @medchannel=Medchannel.new(name: params[:micropost][:medchannel]) if @medchannel.nil?
    @micropost=params[:micropost].except(:medchannel)
    @micropost =current_user.microposts.build(@micropost)
    if @micropost.save and @medchannel.save
      current_user.repost!(@medchannel,@micropost)
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