class StaticPagesController < ApplicationController
  def home
    if signed_in?
    # dont need @micropost =current_user.microposts.build
    @feed_items = current_user.feed.paginate(page: params[:page])
    @name="Medfeed"
    else
      @feed_items=[]
      #Micropost.all.paginate(page: params[:page])
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
