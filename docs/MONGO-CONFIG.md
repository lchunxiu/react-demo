# 关于如何配置mongodb数据库 (windows)
1. 任意目录下新建文件夹mongo

2. mongo文件夹下新建文件夹bin,conf,data,log

3. 将mongo可执行文件拷贝到bin文件夹下

4. conf下新建配置文件mongo.conf，并写入数据

    ```
    port = 9400
    dbpath = data
    logpath = log/mongo.log
    ```
 5. cmd 切换到mongo目录下运行下面命令启动mongo数据库

     ```
      .\bin\mongod.exe -f .\conf\mongo.conf
      ```

 6. cmd 切换到mongo目录下运行下面命令连接mongo数据库

      ```
      .\bin\mongo.exe localhost:9400
      ```
