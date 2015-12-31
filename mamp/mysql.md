## Installing Mysql `5.7.10` on OSX

In the last versions of MySQL, a random password is generated, and can't be used, because it is [expired](https://dev.mysql.com/doc/refman/5.7/en/password-expiration-policy.html).

So, a GUI like Sequel Pro won't be able to connect until you change it.

The MySQL documentation says you can connect with `mysql -u root -h 127.0.0.1 -p`, and change the password by performing an `ALTER` request, but in my case it didn't work, saying my temporary password was invalid.

Those steps allowed me to fix this:

### Restart MySQL with the `skip-grant-tables` option

Stop MySQL from the preference pane.

In the `/usr/local/mysql/support-files/` directory, copy `my-default.cnf` to `my.cnf`.

In `my.cnf`, add the following line in the `[mysqld]` section:

```
skip-grant-tables
```

Then, restart MySQL.

### Update the password

Login in MySQL from the command-line:

```bash
mysql -u root -p
Enter password:
```

Enter the temporary password, this time it should work.

Then, update the `root` password:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'the new password';
```

### Cleanup

* Stop MySQL
* Delete the `my.cnf` file, or remove at least the `skip-grant-tables` line
* Restart; now the connection should be OK
