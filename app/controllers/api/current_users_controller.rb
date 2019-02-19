class Api::CurrentUsersController < ApplicationController

  def index
    user = current_user
    render json: {
        users: user
      }
  end

end
