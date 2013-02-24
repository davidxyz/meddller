class AddImageUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :image_url, :string, :default=>"anon.png"
  end
end
