# == Schema Information
#
# Table name: users
#
#  id         :integer         not null, primary key
#  name       :string(255)
#  email      :string(255)
#  meds       :integer           default:0
#  password_digest :string(255)  not null
#  admin      :boolean          default false
#  image_url  :string           default: anon.png
#  created_at :datetime        not null
#  updated_at :datetime        not null
#   

class User < ActiveRecord::Base
  attr_accessible :email, :name, :password, :password_confirmation, :image, :remote_image_url
  mount_uploader :image, ImageUploader
  has_many :microposts, dependent: :destroy
  #relationships
  has_many :relationships, foreign_key: "follower_id", dependent: :destroy
  has_many :reverse_relationships, foreign_key: "followed_id", class_name: "Relationship", dependent: :destroy
  has_many :followers, through: :reverse_relationships, source: :follower
  has_many :followed_users, through: :relationships, source: :followed
  #relationships_m
  has_many :relationshipms, foreign_key: "subscriber_id", dependent: :destroy
  has_many :medchannels, through: :relationshipms, source: :subscribed
  #relationships_l
  has_many :relationshipls, foreign_key: "liker_id", dependent: :destroy
  has_many :likes, through: :relationshipls, source: :liked
  #relationshiprs
  has_many :relationshiprs,foreign_key: "poster_id",dependent: :destroy
  has_many :reposts,through: :relationshiprs,source: :post

  has_many :comments, dependent: :destroy
  has_secure_password
  before_save :create_remember_token
  before_save{|user| user.email=email.downcase}
  
  validates :name, presence:true, length: {minimum:3,maximum: 12},format: {with: /\A[a-z0-9_]+\z/},uniqueness: {case_sensitive: false}
  VALID_EMAIL_REGEX=/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence:true, format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
  validates :password, presence: true, length: {minimum: 6}
  validates :password_confirmation, presence: true
  def feed
    #this is preliminary. See "Following users" for the full implementation
    #Micropost.where("user_id=?", id)
    #will provide an algoithm for suscribed med_groups and suscribed people
    Micropost.select("*")
  end
  def image_url
    if self.image? 
      self.image_url(:thumb)
    else
      "anon.png"
    end
  end
  def inc
    self.update_attribute(:meds,meds+1)
  end
  def dec
    self.update_attribute(:meds,meds-1)
  end
  def reposted_this?(micropost)
    if relationshiprs.find_by_post_id(micropost.id).nil?
      return false
    else
      true
    end
  end
  def repost!(medchannel,micropost)
    relationshiprs.create!(channel_id: medchannel.id,post_id: micropost.id)
  end
   def remove_from_channel!(medchannel,micropost)
    relationshiprs.find(channel_id:medchannel.id,post_id:micropost.id).destroy
  end
  #relationships_m
  def subscribed?(medchannel)
    relationshipms.find_by_subscribed_id(medchannel.id)
  end
  def subscribe!(medchannel)
    relationshipms.create!(subscribed_id: medchannel.id)
  end
   def unsubscribe!(medchannel)
    relationshipms.find_by_subscribed_id(medchannel.id).destroy
  end
  #relationships_l
  def like!(post,post_type)
  relationshipls.create!(liked_id: post.id,uptype: "upvote",posttype:post_type)
  end
  def hate!(post,post_type)
    relationshipls.create!(liked_id: post.id,posttype: post_type,uptype: "downvote")
  end
  def neutral!(post,post_type)
  relationshipls.find(liked_id: post.id,posttype: post_type).destroy
  end
  def have_I_liked_or_not?(post,post_type)
    begin
    relationshipls.find(:first,:conditions=>{liked_id: post.id,posttype: post_type}).uptype
    rescue
      false
    end
  end
  #relationships_p
  def following?(other_user)
    relationships.find_by_followed_id(other_user.id)
  end
  def follow!(other_user)
    relationships.create!(followed_id: other_user.id)
  end
  def unfollow!(other_user)
    relationships.find_by_followed_id(other_user.id).destroy
  end
  private
    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
end
