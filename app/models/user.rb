class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  # ユーザーから申請したユーザーとのfriendships情報を表示
  has_many :friendships_of_from_user, :class_name => 'Friendship', :foreign_key => 'from_user_id', :dependent => :destroy

  # ユーザーが申請されたユーザーとのfriendships情報表示
  has_many :friendships_of_to_user, :class_name => 'Friendship', :foreign_key => 'to_user_id', :dependent => :destroy

  # ユーザーから申請したユーザーの情報を表示
  has_many :friends_of_from_user, :through => :friendships_of_from_user, :source => 'to_user'

  # ユーザーが申請されたユーザーの情報を表示
  has_many :friends_of_to_user, :through => :friendships_of_to_user, :source => 'from_user'

  has_many :messages

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def friends
     friends_of_from_user + friends_of_to_user
  end

end
