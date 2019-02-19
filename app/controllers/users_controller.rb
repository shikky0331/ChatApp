class UsersController < ApplicationController
  def show
    @user = User.find_by(current_user.id)
  end

  def edit
    @user = User.find(params[:id])
  end

  # def update
  #  @user = User.find(params[:id])
  #  if params[:image]
  #   @user.image_name = "#{@user.id}.jpg"
  #   binding.pry
  #   image = params[:image]
  #   File.binwrite("public/user_images/#{@user.image_name}", image.read)
  #  end
  #
  #
  #  if @user.update_attributes(user_params)
  #    flash[:success] = '変更に成功しました。'
  #    binding.pry
  #    redirect_to @user
  #  else
  #    render 'edit'
  #  end
  # end

  def destroy
   User.find(params[:id]).destroy
   flash[:success] = '退会しました。'
   redirect_to root_url
  end


  # private
  #
  #   def user_params
  #     params.require(:user).permit(:name, :email, :password, :password_confirmation, :image)
  #   end

end
