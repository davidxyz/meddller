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
    @microposts = @user.microposts.paginate(page: params[:page])
    @followeds=@user.followed_users.paginate(page: params[:page])
    @followers=@user.followers.paginate(page: params[:page])
  end
  def create
    @user=User.new(params[:user])
    if @user.save
      #handle a successful save
      sign_in @user
      flash[:success]="welcome to the Meddler"
      redirect_to @user
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
