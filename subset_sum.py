def can_partition(num, sum):

   #TODO: Write - Your - Code
   dp = [[-1 for j in range(sum+1)] for i in len(num)]
   check(dp, num, sum, 0)
   if res == -1:
      return False
   return True


def check(dp, num, target, index):
   if target ==0:
      return 1
   if index==len(num) and target!=0:
      return -1
   
   if dp[index][target]==-1:
      if num[index]<=target:
         res = check(dp, num, target - num[index], index+1)
         dp[index][target-num[index]] = res
         return res
      else:
         res = check(dp, num, target, index+1)
         dp[index][target] = res
         return res
   else:
      return dp[index][target]
   