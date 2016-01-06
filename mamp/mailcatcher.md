## Installing [Mailcatcher](http://mailcatcher.me) on OSX El Capitan with [SIP](https://en.wikipedia.org/wiki/System_Integrity_Protection) enabled

Due to new restrictions on El Capitan , `sudo gem install` can't install stuff in system directories (like `/usr/bin`).

```bash
$ sudo gem install mailcatcher
ERROR:  While executing gem ... (Errno::EPERM)
    Operation not permitted - /usr/bin/mailcatcher
```

---

A workaround is to install the gem in some writeable place - here, in `/usr/local/bin`.

**1 .** Install the gem:

```bash
$ gem install -n /usr/local/bin mailcatcher
```

**2 .** Add the directory to your `$PATH`, if not already present:

```bash
export PATH="/usr/local/bin:${PATH}"
```

**3 .** Configure your `php.ini` with the right path:

```bash
sendmail_path = /usr/local/bin/catchmail -f debug@mailcatcher.local
```
*Using the absolute path of `catchmail` is needed if you are using PHP with Apache, because in this context the `$PATH` is not available.*

**4 .** Launch `mailcatcher` as usual:

```bash
$ mailcatcher
Starting MailCatcher
==> smtp://127.0.0.1:1025
==> http://127.0.0.1:1080
*** MailCatcher runs as a daemon by default. Go to the web interface to quit.
```
