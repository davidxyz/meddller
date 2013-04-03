class ChangeUsers < ActiveRecord::Migration
  def change
    add_column :users, :meds, :integer, :default=>0
  end
end
