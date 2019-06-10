#sudo /etc/init.d/dhcp3-server restart
#sudo asterisk -rx "sip reload"
#sudo asterisk -rx "dialplan reload"
sudo asterisk -rx " originate SIP/9999424421@GSM extension s@interview"
#sudo asterisk -r
