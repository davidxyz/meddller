class Medchannel < ActiveRecord::Base
	#medchannel has nsfw
  #medchannel has description decided by top comment
  attr_accessible :name, :description
  before_save {|channel| channel.name=name.downcase}
  before_save :make_description
  has_many :microposts
  has_many :reverse_relationshipms,foreign_key: "subscribed_id",class_name:"Relationshipm", dependent: :destroy
  has_many :subscribers, through: :reverse_relationshipms,source: :subscriber
  has_many :reverse_relationshiprs,foreign_key: "channel_id",class_name:"Relationshipr", dependent: :destroy
  has_many :posts, through: :reverse_relationshiprs,source: :post
  #only negroByte can make a new medchannel right now when i make it accesible to users ill take away attr accesible satus for the name
  validates :name, :presence=> true,format: {with: /\A[a-z_]+\z/}, uniqueness: {case_sensitive: false},length:{minimum:3,maximum:30}

def feed
  posts
end
def desc(key=0)
  if key==0
  desccription_post=Micropost.find(self.description.to_i)
  else
    begin
     desccription_post=Micropost.find(self.description.to_i).topcomment.body
     desccription_post+" - "+desccription_post.user.name
   rescue
    "*crickets* - meddler"
   end
  end
end
def make_description#the id of the post goes in the description
  desc_post=Micropost.create(:medtype=>"desc")
  desc_post.save
  self.update_attribute(:description,desc_post.id.to_s)
  return desc_post
end
end
