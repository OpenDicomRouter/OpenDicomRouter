import redis


class RedisDB:
    redis_host_write = "172.18.0.7"
    redis_host_read = "172.18.0.7"
    redis_port = 6379
    redis_password = ""

    def __init__(self):
        self.r_write = redis.Redis(host=self.redis_host_write, port=self.redis_port,
                                   password=self.redis_password)
        self.r_read = redis.Redis(host=self.redis_host_read, port=self.redis_port,
                                  password=self.redis_password)

    def get(self, key):
        return self.r_read.get(key)

    def set_exp(self, key, value, time_to_expire=-1):
        self.r_write.setex(key, time_to_expire, value)

    def set(self, key, value):
        print("\n\n\nSet instance id\n\n\n")
        self.r_write.set(key, value)

    def get_ttl(self, key):
        return self.r_read.ttl(key)

    def delete(self, key):
        self.r_write.delete(key)