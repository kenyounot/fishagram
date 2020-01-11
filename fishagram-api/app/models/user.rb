class User < ApplicationRecord
    has_many :posts
    has_many :likes


    has_secure_password

    validates_presence_of :email
    validates_uniqueness_of :email
    validates_presence_of :username
    validates_uniqueness_of :username

end
