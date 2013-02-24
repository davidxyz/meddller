class Relationship < ActiveRecord::Base
  # == Schema Information
  #
  # Table name: med_groups
  #
  #  id               :integer         not null, primary key
  #  followed_id      :integer         the id of the user being followed
  #  follower_id      :integer         user_ids of the users following the current_user
  #  created_at       :datetime        not null
  #  updated_at       :datetime        not null
  #

    attr_accessible :followed_id
    belongs_to :follower, class_name: "User"
    belongs_to :followed, class_name: "User"
    validates :follower_id, presence: true
    validates :followed_id, presence: true
end
