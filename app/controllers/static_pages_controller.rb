class StaticPagesController < ApplicationController
  def home#aka popular posts
    if signed_in?
    # dont need @micropost =current_user.microposts.build
    @feed_items = Micropost.default_feed.paginate(page: params[:page])
    @name="Medfeed"
    @orig="Medfeed"
    else
      @feed_items=Micropost.default_feed.paginate(page: params[:page])
    @name="Medfeed"
    @orig="Medfeed"
    end
      respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums}
      }
      format.html
      end
  end
  def hall_of_fame# best posts of all time
#self.calculate_feed(user,medchannel,popularity,default=false)
    @feed_items = Micropost.calculate_feed(nil,nil,:hall_of_fame,nil).paginate(page: params[:page])
     @name="Hall Of Fame"
     @orig="Medfeed"
      respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums}
      }
      format.html
      end
  end
  
  def risingposts# rising posts in algorithm
   @feed_items = Micropost.calculate_feed(current_user,nil,:rising)
    @name="Trending"

    @orig="Medfeed"
      respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums}
      }
      format.html
      end
  end
  def newposts# newest posts in last 5 hours
      @feed_items = Micropost.calculate_feed(current_user,nil,:new)
      @name="New"
      @orig="Medfeed"
      respond_to do |format|
     format.json {
        @channels=[]
        @current_users=[]
        @comment_nums=[]
        @repost_nums=[]
        @names=[]
        @feed_items.each{|x| 
          user=x.user
          @channels<<x.channels
          @current_users<<current_user?(user)
          @names<<user.name
          @comment_nums<<x.comment_threads.count
          @repost_nums<<x.reposters.count
        }
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums}
      }
      format.html
      end
  end
  def help
  end
  def about
  end
  def contact
  end
  def ask
    
  end
end
