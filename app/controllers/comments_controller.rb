class CommentsController < ApplicationController
  before_filter :signed_in_user
  before_filter :correct_user, only: [:destroy,:edit]
  def increment
    if params[:type]=="upvote"
      @comment=Comment.find(params[:id])
      @type=current_user.have_I_liked_or_not?(@comment,"comment")
      if @type==false #make a new relationship
        current_user.like!(@comment,"comment")
	User.increment_counter :meds, @comment.user
        @comment.inc
      elsif @type=="downvote"
        current_user.neutral!(@comment,"comment")
        @comment.inc
	User.increment_counter :meds, @comment.user
      elsif @type=="upvote"
        #do nothing
      end
    elsif params[:type]=="downvote"
    @comment= Comment.find(params[:id])
      @type=current_user.have_I_liked_or_not?(@comment,"comment")
      if @type==false#make a new relationship
        current_user.hate!(@comment,"comment")
	User.decrement_counter :meds, @comment.user	
        @comment.dec
      elsif @type=="upvote"
        current_user.neutral!(@comment,"comment")
	 User.decrement_counter :meds, @comment.user
        @comment.dec
      elsif @type=="downvote"
        # do nothing
      end
    end#else someone is tamepring with he app and nothing happens
  respond_to do |format|
    format.json { render :json => { user_meds: @micropost.user.meds,micro_meds: @micropost.meds, type: @type} }
  end
  end
def create#reply or make one
    return false unless user_ready?
    @comment= Comment.build_from(Micropost.find(params[:micropost_id].to_i),current_user.id,params[:body])
    @micropost=Micropost.find(params[:micropost_id])
    if @comment.save
      @comment.move_to_child_of(Comment.find(params[:parent_id].to_i)) if !params[:parent_id].nil? and params[:parent_id].to_i!=0
      respond_to do |format|
        format.html {redirect_to "/posts/"+@micropost.id.to_s+'/'+urlify(@micropost.title)}
        format.json {render :json => { valid: true }}
      end
    else
      respond_to do |format|
        format.html {redirect_to "/posts/"+@micropost.id.to_s+'/'+urlify(@micropost.title)}
        format.json {render :json => { valid: true,error: errors[:base] }}
      end
    end
  end
  def destroy
    @comment.destroy
    redirect_back_or root_path
  end
    def correct_user
      @comment=Comment.find(params[:id])
      redirect_to root_path if current_user?(@comment.user)==false
    end
end
