require "User.rb"
class Api::UsersController < ApplicationController

  def index
    user = current_user
    friendships = user.friends

    render json: {
        users: friendships
      }
  end

  def search
    unless params[:name] === ''
      not_current_user = User.where.not(id: current_user.id)
      user = not_current_user.where("name LIKE ?", "#{params[:name]}%")
      render json: user
    else
      render json: user
    end
  end

end
