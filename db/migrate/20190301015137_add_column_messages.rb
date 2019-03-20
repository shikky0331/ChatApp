class AddColumnMessages < ActiveRecord::Migration
  def change
    add_column :messages, :read, :integer, default: 0
  end
end
