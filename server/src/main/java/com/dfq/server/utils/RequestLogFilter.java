package com.dfq.server.utils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.io.Serial;

public class RequestLogFilter extends HttpFilter {
  static final Logger log = LoggerFactory.getLogger(RequestLogFilter.class);

  @Serial
  private static final long serialVersionUID = 8991118181953196532L;


  @Override
  protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

    // Wrapper 封装 Request 和 Response
    ContentCachingRequestWrapper cachingRequest = new ContentCachingRequestWrapper(request);
    ContentCachingResponseWrapper cachingResponse = new ContentCachingResponseWrapper(response);

    // 继续执行请求链
    chain.doFilter(cachingRequest, cachingResponse);

    //在请求完成后记录请求、响应日志

    // 请求方法
    String method = request.getMethod();
    // URI
    String uri = request.getRequestURI();
    // 请求体
    byte[] requestContent = cachingRequest.getContentAsByteArray();

    log.info("Request => {} {} {}", method, uri, new String(requestContent));

    // 响应状态
    int status = response.getStatus();
    // 响应体
    byte[] responseContent = cachingResponse.getContentAsByteArray();

    log.info("Response <= {} {}", status, new String(responseContent));

    // 把缓存的响应数据，响应给客户端
    cachingResponse.copyBodyToResponse();
  }
}
