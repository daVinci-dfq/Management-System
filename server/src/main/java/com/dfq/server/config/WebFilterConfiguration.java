package com.dfq.server.config;

import com.dfq.server.utils.RequestLogFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
public class WebFilterConfiguration {

  @Bean
  public FilterRegistrationBean<RequestLogFilter> requestLogFilter (){
    FilterRegistrationBean<RequestLogFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new RequestLogFilter());
    // 拦截 "/api" 开头的请求
    registrationBean.addUrlPatterns("/api/*");
    // 执行顺序最靠前
    registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return registrationBean;
  }

}
