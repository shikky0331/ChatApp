class UsersController < ApplicationController
  def show
    @user = User.find_by(current_user.id)
  end

  def edit
    @user = User.find_by(current_user.id)
  end

end
