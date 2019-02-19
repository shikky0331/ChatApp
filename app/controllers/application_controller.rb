class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!


  protected

    def configure_permitted_parameters
      added_attrs = [ :name, :email, :password, :password_confirmation, :image]
      devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
      devise_parameter_sanitizer.permit :users, keys: added_attrs
      # devise_parameter_sanitizer.permit :sign_in, keys: added_attrs
    end
end
