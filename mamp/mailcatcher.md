## Installing Mailcatcher on OSX El Capitan with [SIP](https://en.wikipedia.org/wiki/System_Integrity_Protection) enabled

Due to new restrictions on El Capitan , `sudo gem install` can't install stuff in system directories (like `/usr/bin`).

```bash
$ sudo gem install mailcatcher
ERROR:  While executing gem ... (Errno::EPERM)
    Operation not permitted - /usr/bin/mailcatcher
```

---

A workaround is to install the gem somewhere in your home directory (here, in `~/.bin`).

**1 .** Install the gem:

```bash
$ gem install mailcatcher --user-install -n~/.bin
```

**2 .** Add the directory to your `$PATH`, if not already present:

```bash
export PATH="/Users/you/.bin:${PATH}"
```

**3 .** Configure your `php.ini` with the right path:

```bash
sendmail_path = /usr/bin/env /Users/you/.bin/catchmail -f some@from.address
```

**4 .** Lanch `mailcatcher` as usual:

```bash
$ mailcatcher
Starting MailCatcher
==> smtp://127.0.0.1:1025
==> http://127.0.0.1:1080
*** MailCatcher runs as a daemon by default. Go to the web interface to quit.
```
