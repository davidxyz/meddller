class StaticPagesController < ApplicationController
  def home#aka popular posts
    result=determine_pagination(Micropost.default_feed,if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @feed_items =result[:feed]
   @medfeed_height=result[:medfeed_height]
    @name="Medfeed"
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
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render "home",:locals => { :@feed_items => @feed_items,:@name=>@name,:@medfeed_height=>@medfeed_height,:@orig=>@orig}}
      end
  end
  def hall_of_fame# best posts of all time
#self.calculate_feed(user,medchannel,popularity,default=false)
    result=determine_pagination(Micropost.calculate_feed(nil,nil,:hall_of_fame,nil),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @medfeed_height=result[:medfeed_height]
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
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render "home",:locals => { :@feed_items => @feed_items,:@name=>@name,:@medfeed_height=>@medfeed_height,:@orig=>@orig}}
      end
  end
  
  def risingposts# rising posts in algorithm
   result=determine_pagination(Micropost.calculate_feed(current_user,nil,:rising),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @feed_items =result[:feed]
   @medfeed_height=result[:medfeed_height]
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
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render "home",:locals => { :@feed_items => @feed_items,:@name=>@name,:@medfeed_height=>@medfeed_height,:@orig=>@orig}}
      end
  end
  def newposts# newest posts in last 5 hours
      result=determine_pagination(Micropost.calculate_feed(current_user,nil,:new),if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @feed_items =result[:feed]
   @medfeed_height=result[:medfeed_height]
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
      render :json => { :feed=>@feed_items,:channels=>@channels,:current_users=>@current_users,:names=>@names,:comments=>@comment_nums,:reposts=>@repost_nums,:feed_height=>@medfeed_height}
      }
      format.html{render "home",:locals => { :@feed_items => @feed_items,:@name=>@name,:@medfeed_height=>@medfeed_height,:@orig=>@orig}}
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
