FROM fluent/fluentd

COPY fluent.conf /fluentd/etc/

ENV FLUENTD_OPT=""
ENV FLUENTD_CONF="fluent.conf"

RUN fluent-gem install fluent-plugin-elasticsearch
RUN fluent-gem install fluent-plugin-record-reformer
RUN fluent-gem install fluent-plugin-nginx-status
RUN fluent-gem install fluent-plugin-mongo
RUN fluent-gem install fluent-plugin-woothee
RUN fluent-gem install fluent-plugin-concat
RUN fluent-gem install fluent-plugin-parser

CMD exec fluentd -c /fluentd/etc/$FLUENTD_CONF -p /fluentd/plugins $FLUENTD_OPT
