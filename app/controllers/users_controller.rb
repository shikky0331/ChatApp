class UsersController < ApplicationController
  def show
    @user = User.find_by(current_user.id)
  end

  def edit
    @user = User.find_by(current_user.id)
  end

  # def destroy
  #  User.find(params[:id]).destroy
  #  flash[:success] = '退会しました。'
  #  redirect_to root_url
  # end
end
