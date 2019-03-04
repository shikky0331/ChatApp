class Api::MessagesController < ApplicationController
  require "User.rb"
  require 'rubygems'
  require 'RMagick'
  protect_from_forgery :except => [:image]

  def index
    if params[:user_id]

      # 1 クリックしたユーザーのメッセージを取得
      click_user_messages = Message.where(user_id: params[:user_id])

      # 2 クリックしたユーザーがcurrent_userに送ったメッセージを取得
      click_user_to_current_user = click_user_messages.where(to_user_id: current_user.id)

      # 3 current_userがクリックしたユーザに送ったメッセージを取得
      current_user_to_message = current_user.messages.where(to_user_id: params[:user_id])

      # 2と3のメッセージを取得
      messages = current_user_to_message +   click_user_to_current_user

      # to_user_id = params[:user_id]

      render json: {
        messages: messages.sort,
        to_user_id: params[:user_id]
      }
    else
      # 厳しいか userごとのmessage.lastのreadをとりたい。
      # current_userの友達の全てのmessageを取得
      friends_messages =  Message.where(user_id: current_user.friends).where(to_user_id: current_user)

      # 友達ごとにmessageを分ける
      messages = friends_messages.all.group_by { |user| [user[:user_id]] }

      render json: messages
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

    message.save(validate: false)

    render json: message
  end

  # def current_messages
  #   messages = current_user.messages
  #   render json: {
  #     messages: messages
  #   }
  # end

end
