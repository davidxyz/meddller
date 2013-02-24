class CommentsController < ApplicationController
  before_filter :signed_in_user
  before_filter :correct_user, only: [:destroy,:edit]
  def create
    if params[:comment][:parent_id].nil?
      @comment=Comment.build_from(Micropost.find(params[:comment][:micropost_id]),current_user.id,params[:comment][:body])
    else
       @comment= Comment.move_to_child_of(Comment.find(params[:comment][:parent_id]))
    end
    if @comment.save
      respond_to do |format|
        format.html {redirect_to "microposts/"+params[:comment][:micropost_id].to_s}
        format.js
      end
    else
      flash[:error]="Something went wrong...."
    end
  end
  def destroy
    @comment.destroy
    redirect_back_or root_path
  end
  private 
    def correct_user
      @comment=Comment.find(params[:id])
      redirect_to root_path if current_user?(@comment.user)==false
    end
end
