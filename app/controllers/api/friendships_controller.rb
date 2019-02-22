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
   Friendship.find_by(current_user.id, params[:id]).destroy

   # friends = current_user.friendships_of_from_user + current_user.friendships_of_to_user
   #
   # friends.where("to_user_id = ? OR from_user_id = ?",'params[:id]', 'params[:id]')

   # friends.find(to_user_id: params[:id], from_user_id: params[:id]).destroy
   #
# to_userが削除できない？
   # user.unfollow!(params[:id])
   # def unfollow!(id)
   #   friendships_of_from_user.find_by(to_user_id: id).destroy
   #   # フォローを外す
   # end
   # redirect_to root_path
  end
end
