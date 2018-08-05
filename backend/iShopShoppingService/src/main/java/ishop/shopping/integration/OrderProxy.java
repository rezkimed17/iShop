package ishop.shopping.integration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import ishop.shopping.dto.ShoppingCartDto;

@Component
public class OrderProxy {
	@Autowired
	OrderFeignClient orderClient;

	public void createOrder(ShoppingCartDto shoppingCartDTO) {	
		orderClient.createOrder(shoppingCartDTO);
	};
	
	@FeignClient("iShopOrderService")
	interface OrderFeignClient {
		@PostMapping("/create")
		public void createOrder(@RequestBody ShoppingCartDto shoppingCartDTO);
	}
}