class CommentsController < ApplicationController
  before_filter :signed_in_user
  before_filter :correct_user, only: [:destroy,:edit]
  def create
    if params[:parent_id].nil?
      @comment=Comment.build_from(Micropost.find(params[:micropost_id]),current_user.id,params[:body])
    else
       @comment= Comment.move_to_child_of(Comment.find(params[:parent_id]))
    end
    if @comment.save
      respond_to do |format|
        format.html {redirect_to "microposts/"+params[:micropost_id].to_s}
        format.json {render :json => { valid: true }}
      end
    else
      respond_to do |format|
        format.html {redirect_to "microposts/"+params[:micropost_id].to_s}
        format.json {render :json => { valid: true,error: errors[:base] }}
      end
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
