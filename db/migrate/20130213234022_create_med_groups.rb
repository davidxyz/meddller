class CreateMedGroups < ActiveRecord::Migration
  def change
    create_table :med_groups do |t|
      t.string :name, :default => "random"
      t.integer :followers, :default => 0
      
      t.timestamps
    end
    add_index :med_groups, :name, :uniqueness=>true
  end
end
