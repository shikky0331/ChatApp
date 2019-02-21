require "User.rb"
class Api::UsersController < ApplicationController

  def index
    user = current_user
    friendships = user.friends
    # user = User.all
    render json: {
        users: friendships
      }
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def search
    # user = User.all
    # user = User.where("name LIKE ?", "params[:name]%")
    # binding.pry
    unless params[:name] === ''
      not_current_user = User.where.not(id: current_user.id)
      user = not_current_user.where("name LIKE ?", "#{params[:name]}%")
      # user = User.where("name LIKE ?", "sh%")
      render json: user
    else
      render json: user
    end
  end

    private

    def user_params
      params.require(:user).permit(:email, :name)
    end

end
