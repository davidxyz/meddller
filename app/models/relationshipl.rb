class Relationshipl < ActiveRecord::Base
  # attr_accessible :title, :body
  #liked_id=comment or micropost_id
  attr_accessible :liked_id,:uptype, :posttype
  belongs_to :liker, class_name: "User"
    belongs_to :liked, class_name: "Micropost"
    belongs_to :liked, class_name: "Comment"
    validates :liker_id, presence: true
    validates :liked_id, presence: true
    validates :posttype, presence: true
validates :uptype,:presence=>true
end
