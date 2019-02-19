class AddDefaultImageToUserColumn < ActiveRecord::Migration
  def change
    change_column :users, :image, :string, default: :default_image
  end
end
