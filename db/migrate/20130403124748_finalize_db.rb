class FinalizeDb < ActiveRecord::Migration
  def up
add_column :users, :image, :string
add_column :microposts, :image, :string
  end

  def down
remove_column :microposts, :image
remove_column :users, :image
  end
end
