require "User.rb"
require 'byebug'
require 'rubygems'
require 'RMagick'
class Api::MessagesController < ApplicationController
  protect_from_forgery :except => [:image]

  def index
    # if params.has_key(:user_id)?
    if params[:user_id]
      # binding.pry
      user_id_message =
      click_user_messages = Message.where(user_id: params[:user_id])
      # クリックしたユーザーのメッセージを取得

      click_user_to_current_user = click_user_messages.where(to_user_id: current_user.id)
      # クリックしたユーザーがcurrent_userに送ったメッセージを取得

      current_user_to_message = current_user.messages.where(to_user_id: params[:to_user_id])
      # current_userがクリックしたユーザに送ったメッセージを取得

      messages = current_user_to_message +   click_user_to_current_user
      # 下記２つのメッセージを取得
      to_user_id = params[:user_id]

      render json: {
        messages: messages.sort,
        to_user_id: to_user_id
      }
    else
      messages = Message.all
      render json: {
        messages: messages
      }
    end
    # Message.where(user_id: 5)
  end
  # def index
  #     messages = Message.where(user_id: 2)
  #     render json: {
  #       messages: messages
  #     }　
  #     # 通る
  # end
  #
  # def index
  #   messages = Message.all
  #   render json: {
  #       messages: messages
  #     }
  # end

# user.idを渡したユーザーのメッセージを取ってくる
  # def index
  #   user = User.find[params:id]
  #   user.messages
  #   render json: {
  #     user: user.messages
  #   }
  # end

  # def index
  #   messages = Message.all
  #   user = current_user
  #   friendships = user.friends
  #   allMessageUser = friendships + messages
  #
  #
  #   render json: {
  #       allMessageUser: allMessageUser
  #     }
  # end


  def create
    # @message = Message.create(message_params)
      message = Message.create(
      content: params[:content],
      user_id: current_user.id,
      to_user_id: params[:to_user_id]
    )
    # binding.pry
    # @message = current_user.messages.build(message_params)
    render json: message
  end

  def image
    # if params[:image]
      post_image = "#{current_user.messages.last.id + 1}.jpg"

      image = params[:image]

      File.binwrite("public/message_images/#{post_image}", image.read)

      rmagick = Magick::Image.read("public/message_images/#{post_image}").first
      rmagick = rmagick.resize(500,500)
      rmagick.write("#{post_image}")
      # params[:image] = "#{current_user.id}.image.jpg"

      message = Message.new(
        # image: params[:image]
        image: rmagick,
        to_user_id: params[:to_user_id],
        user_id: current_user.id
      )
      # binding.pry

      message.save(validate: false)

      render json: message
    # end
  end

    # private
    #
    # def message_params
    #   params.require(:message).permit(:content, :from, :timestamp, :user_id)
    # end
end
