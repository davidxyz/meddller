class CreateRelationshipsGroups < ActiveRecord::Migration
  def change
    create_table :relationships_groups do |t|
      t.integer :suscriber_id
      t.integer :med_group_id

      t.timestamps
    end
    add_index :relationships_groups, :suscriber_id
    add_index :relationships_groups, :med_group_id
    add_index :relationships_groups, [:suscriber_id, :med_group_id], unique: true
  end
end
