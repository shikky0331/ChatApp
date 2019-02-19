require "User.rb"
class Api::FriendshipsController < ApplicationController
  protect_from_forgery :except => [:destroy]


  def index
    friendship = Friendship.all
    render json: {
      friendships: friendship
    }
  end

  def create
   # user = User.find(params[:friendship][:from_user_id])
   # current_user.follow!(user)
   friendship = Friendship.new(
     from_user_id: current_user.id,
     to_user_id: params[:to_user_id]
   )
   
   friendship.save
   # if (friendship.save) then
   #   redirect_to root_path
   # end

  end

  def destroy
   # id = current_user.friendships_of_from_user.find_by(params[:to_user_id][:id])
   # user = Friendship.find(id).to_user_id
   # クリックしたユーザーのidで
   user = current_user
   user.friendships_of_from_user.find_by(params[:id]).destroy
# to_userが削除できない？
   # user.unfollow!(params[:id])
   # def unfollow!(id)
   #   friendships_of_from_user.find_by(to_user_id: id).destroy
   #   # フォローを外す
   # end
   # redirect_to root_path
  end
end
