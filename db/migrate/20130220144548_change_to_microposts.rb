class ChangeToMicroposts < ActiveRecord::Migration
  def change
    remove_column :microposts, :image_url
    add_column :microposts, :preview_url, :string
  end
end
