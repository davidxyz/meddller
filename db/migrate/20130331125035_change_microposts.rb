class ChangeMicroposts < ActiveRecord::Migration
  def up
add_column :microposts,:medtype,:string,:default=>"self_post"
  end

  def down
drop_column :microposts
  end
end
