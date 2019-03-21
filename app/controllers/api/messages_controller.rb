class Api::MessagesController < ApplicationController
  # require "User.rb"
  require 'rubygems'
  protect_from_forgery :except => [:image]

  def index
    if params[:user_id]

      # クリックしたユーザーのメッセージを取得
      user_messages = Message.where(user_id: params[:user_id])

      # クリックしたユーザーがcurrent_userに送ったメッセージを取得
      toCurrent_user_messages = user_messages.where(to_user_id: current_user.id)

      # current_userがクリックしたユーザに送ったメッセージを取得
      toUser_messages = current_user.messages.where(to_user_id: params[:user_id])

      # メッセージを取得
      messages = toUser_messages +   toCurrent_user_messages

      render json: {
        messages: messages.sort,
        to_user_id: params[:user_id]
      }
    end
  end

  def create
    if params[:to_user_id]
      message = Message.create(
      content: params[:content],
      user_id: current_user.id,
      to_user_id: params[:to_user_id],
      timestamp: Time.now.to_i,
    )
      render json: message
    end
  end

  def image
    post_image = "#{Message.last.id + 1}.jpg"

    image = params[:image]

    File.binwrite("public/message_images/#{post_image}", image.read)

    # リサイズ
    rmagick = Magick::Image.read("public/message_images/#{post_image}").first
    rmagick = rmagick.resize(500,500)
    rmagick.write("public/resize_image/#{post_image}")

    message = Message.new(
      image: rmagick,
      to_user_id: params[:to_user_id],
      user_id: current_user.id
    )
    #   validates :content, presence: trueを回避
    message.save(validate: false)

    render json: message
  end
end
