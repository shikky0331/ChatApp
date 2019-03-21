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
      not_friend = User.where.not(id: current_user.id).where.not(id: current_user.friends)

      user = not_friend.where("name LIKE ?", "#{params[:name]}%")
      render json: user
    else
      render json: user
    end
  end

end
