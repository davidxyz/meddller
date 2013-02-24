require 'Nokogiri'
require 'open-uri'
class MicropostsController < ApplicationController
  before_filter :signed_in_user, only: [:new,:create, :destroy,:inc]
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
  def new
    @micropost =current_user.microposts.build
  end
  def new2
    @micropost = current_user.microposts.build
  end
  def new3
    @micropost=current_user.microposts.build
  end
  def inc
    @micropost=Micropost.find(params[:id])
    @micropost.user.meds+=1
    @micropost.meds+=1
    respond_to do |format|
      format.js 
    end
  end
  def show
    @micropost=Micropost.find(params[:id])
    @comments=@micropost.comment_threads.paginate(page: params[:page])
    @comment=Comment.build_from( @micropost, current_user.id, " " )
  end
  def create
    @micropost =current_user.microposts.build(params[:micropost])
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