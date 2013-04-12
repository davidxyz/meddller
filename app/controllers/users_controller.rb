class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:edit,:update,:index, :destroy,:following,:followers]
  before_filter :correct_user, only: [:edit, :update]
  before_filter :admin_user, only: [:delete, :index]
  def new
    @user=User.new
  end
  def edit
    @user=User.find(params[:id])
  end
  def show
    @user=User.find_by_name(params[:name]) unless params[:name].nil?
    @user=User.find(params[:id]) unless params[:id].nil?
    begin#no method error
    @name=@user.name
    rescue
      not_found
    end
    @followeds=@user.followed_users
    @followers=@user.followers
    result=determine_pagination(@user.microposts,if params[:page].to_i<1 or params[:page].to_i.to_s=="0" then 1 else params[:page].to_i end)
   @microposts =result[:feed]
   @medfeed_height=result[:medfeed_height]
  end
  def no_other_users#check to see if there are no other users with your name ajax
    user=User.find_by_name(params[:name])
    if user.nil? then user=false else user=true end
    respond_to do |format|
      format.json { render :json => { :user=>user}}
    end
  end
  def no_other_emails
     email=User.find_by_email(params[:email])
    if email.nil? then email=false else email=true end
    respond_to do |format|
      format.json { render :json => { :email=>email}}
    end
  end
  def create
    @user=User.new(params[:user])
    if @user.save
      #handle a successful save
      sign_in @user
      flash[:success]="welcome to the Meddler"
	redirect_to '/users/'+@user.name
    else
      render 'new'
    end
  end
  def update
    @user =User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash[:success]="Profile updated"
      sign_in @user
      redirect_to @user
    else
      render 'edit'
    end
  end
  def signed_in_user
    unless signed_in?
      store_location
      redirect_to signin_path, notice: "Please sign in."
    end
  end
  def correct_user
    @user=User.find(params[:id])
    redirect_to(root_path) unless current_user?(@user)
  end
  def index
    @users=User.paginate(page: params[:page])
  end
  def destroy
    User.find(params[:id]).destroy
    flash[:success]="User destroyed."
    redirect_to users_path
  end
  def admin_user
    redirect_to(root_path) unless current_user.admin?
  end
end
