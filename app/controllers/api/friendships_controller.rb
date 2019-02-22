class Api::FriendshipsController < ApplicationController
  require "User.rb"
  protect_from_forgery :except => [:destroy]

  def index
    friendship = Friendship.all
    render json: {
      friendships: friendship
    }
  end

  def create
   friendship = Friendship.new(
     from_user_id: current_user.id,
     to_user_id: params[:to_user_id]
   )

   friendship.save
  end

  def destroy
    # current_userが友達申請したユーザの中から　削除したい関係を検索
    from_user_friendship = current_user.friendships_of_from_user.find_by(to_user_id: params[:id])

   # current_userが友達申請されたユーザの中から　削除したい関係を検索
    to_user_friendship =  current_user.friendships_of_to_user.find_by(from_user_id: params[:id])

    # どちらかはnilに必ずなる

      if from_user_friendship.nil?
        to_user_friendship.destroy
      else
        from_user_friendship.destroy
      end
  end

end
