package application.dto;

import org.json.JSONException;
import org.json.JSONObject;

public class login {
	
	private String flat_number = "";
	private String consumer_name = "";
	private String mobile_no = "";
	private String email_id = "";
	private String balance_amount = "";
	private String recharge_time = "";
	private String dg_reading = "";
	private String grid_reading = "";
	private String last_reading_updated = "";
	private String notify_load = "";
	private String notify_balance = "";
	private String notify_energy_source = "";
	private String notify_consumption = "";
	private String notification_sms = "";
	private String notification_email = "";
	private String low_bal_alert= "";
	private String grid_load_alarm = "";
	private String dg_load_alarm = "";
	private Double alert_dg_consumption;
	private Double alert_grid_consumption;
	private String load_setting_enabled = "";
	private String dg_sanctioned_load = "";
	private String grid_sanctioned_load = "";
	private String grid_overload_setting = "";
	private String dg_overload_setting = "";
	private String grid_overload_from_time = "";
	private String grid_overload_to_time = "";
	private String dg_overload_from_time = "";
	private String dg_overload_to_time = "";
	private String support_name = "";
	private String support_contact_no = "";
	private String support_email = "";
	private String supervisor_name = "";
	private String supervisor_contact_no = "";
	private String supervisor_email = "";
	private String application;
	private String display_load_setting_screen = "";
	private Double daily_dg_unit;
	private Double daily_grid_unit;
	private Double monthly_grid_unit;
	private Double monthly_dg_unit;
	private Double daily_dg_amount;
	private Double daily_grid_amount;
	private Double monthly_dg_amount;
	private Double monthly_grid_amount;
	private String reading_unit = "";
	private String currency = "";
	private String overload_grid = "";
	private String overload_dg = "";
	private String last_reading_updated_dg = "";
	private String energy_source = "";
	private String monthly_bill_enable="";
	private int monthly_bill_no_of_month=1;
	private String device_app_ver="";
	private String android_version="";
	private String plm="";
	private String load_unit="";
	private String power_cut_restore_notification="";
	private String source_change_notification="";
	private String recharge_notification="";
	private String paytm_mobile_url="";
	private String mobikwik_mobile_url="";
	private String recharge_popup_message="";
	private Double fix_charges;
	private Double dr_cr;
	private Double fix_charges_monthly;
	private Double dr_cr_monthly;
	private String site_code="";
	private String pg_enable_mobikwik="";
	private String pg_enable_paytm="";
	private String pg_enable_hdfc="";

	private String site_id="";
	private String site_name="";
	private String site_address="";
	private String site_city="";
	private String site_state="";
	private String site_country="";
	private String site_zipcode="";

    public int getMonthly_bill_no_of_month() {
        return monthly_bill_no_of_month;
    }

    public void setMonthly_bill_no_of_month(int monthly_bill_no_of_month) {
        this.monthly_bill_no_of_month = monthly_bill_no_of_month;
    }

    public String getSite_id() {
		return site_id;
	}

	public void setSite_id(String site_id) {
		this.site_id = site_id;
	}

	public String getSite_name() {
		return site_name;
	}

	public void setSite_name(String site_name) {
		this.site_name = site_name;
	}

	public String getSite_address() {
		return site_address;
	}

	public void setSite_address(String site_address) {
		this.site_address = site_address;
	}

	public String getSite_city() {
		return site_city;
	}

	public void setSite_city(String site_city) {
		this.site_city = site_city;
	}

	public String getSite_state() {
		return site_state;
	}

	public void setSite_state(String site_state) {
		this.site_state = site_state;
	}

	public String getSite_country() {
		return site_country;
	}

	public void setSite_country(String site_country) {
		this.site_country = site_country;
	}

	public String getSite_zipcode() {
		return site_zipcode;
	}

	public void setSite_zipcode(String site_zipcode) {
		this.site_zipcode = site_zipcode;
	}

	public String getPg_enable_hdfc() {
		return pg_enable_hdfc;
	}

	public void setPg_enable_hdfc(String pg_enable_hdfc) {
		this.pg_enable_hdfc = pg_enable_hdfc;
	}

	public String getPg_enable_mobikwik() {
        return pg_enable_mobikwik;
    }

    public void setPg_enable_mobikwik(String pg_enable_mobikwik) {
        this.pg_enable_mobikwik = pg_enable_mobikwik;
    }

    public String getPg_enable_paytm() {
        return pg_enable_paytm;
    }

    public void setPg_enable_paytm(String pg_enable_paytm) {
        this.pg_enable_paytm = pg_enable_paytm;
    }

    public String getSite_code() {
		return site_code;
	}

	public void setSite_code(String site_code) {
		this.site_code = site_code;
	}

	public String getPower_cut_restore_notification() {
		return power_cut_restore_notification;
	}

	public void setPower_cut_restore_notification(String power_cut_restore_notification) {
		this.power_cut_restore_notification = power_cut_restore_notification;
	}

	public String getSource_change_notification() {
		return source_change_notification;
	}

	public void setSource_change_notification(String source_change_notification) {
		this.source_change_notification = source_change_notification;
	}

	public String getRecharge_notification() {
		return recharge_notification;
	}

	public void setRecharge_notification(String recharge_notification) {
		this.recharge_notification = recharge_notification;
	}
	public String getPaytm_mobile_url() {
		return paytm_mobile_url;
	}
	public void setPaytm_mobile_url(String paytm_mobile_url) {
		this.paytm_mobile_url = paytm_mobile_url;
	}
    public String getRecharge_popup_message() {
        return recharge_popup_message;
    }
    public void setRecharge_popup_message(String recharge_popup_message) {
        this.recharge_popup_message = recharge_popup_message;
    }

	public String getMobikwik_mobile_url() {
		return mobikwik_mobile_url;
	}
	public void setMobikwik_mobile_url(String mobikwik_mobile_url) {
		this.mobikwik_mobile_url = mobikwik_mobile_url;
	}

	public Double getFix_charges() {
		return fix_charges;
	}
	public void setFix_charges(Double fix_charges) {
		this.fix_charges = fix_charges;
	}

	public Double getDr_cr() {
		return dr_cr;
	}
	public void setDr_cr(Double dr_cr) {
		this.dr_cr = dr_cr;
	}

	public Double getFix_charges_monthly() {
		return fix_charges_monthly;
	}
	public void setFix_charges_monthly(Double fix_charges_monthly) {
		this.fix_charges_monthly = fix_charges_monthly;
	}

	public Double getDr_cr_monthly() {
		return dr_cr_monthly;
	}
	public void setDr_cr_monthly(Double dr_cr_monthly) {
		this.dr_cr_monthly = dr_cr_monthly;
	}


//***** Getter & Setters *****//

	public String getLoad_unit() {
		return load_unit;
	}

	public void setLoad_unit(String load_unit) {
		this.load_unit = load_unit;
	}
	
	public String getFlat_number() {
		return flat_number;
	}
	public void setFlat_number(String flat_number) {
		this.flat_number = flat_number;
	}
	public String getPlm() {
		return plm;
	}

	public void setPlm(String plm) {
		this.plm = plm;
	}
	public String getConsumer_name() {
		return consumer_name;
	}
	public void setConsumer_name(String consumer_name) {
		this.consumer_name = consumer_name;
	}
	public String getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(String mobile_no) {
		this.mobile_no = mobile_no;
	}
	public String getEmail_id() {
		return email_id;
	}
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}
	public String getBalance_amount() {
		return balance_amount;
	}
	public void setBalance_amount(String balance_amount) {
		this.balance_amount = balance_amount;
	}
	public String getRecharge_time() {
		return recharge_time;
	}
	public void setRecharge_time(String recharge_time) {
		this.recharge_time = recharge_time;
	}
	public String getDg_reading() {
		return dg_reading;
	}
	public void setDg_reading(String dg_reading) {
		this.dg_reading = dg_reading;
	}
	public String getGrid_reading() {
		return grid_reading;
	}
	public void setGrid_reading(String grid_reading) {
		this.grid_reading = grid_reading;
	}
	public String getLast_reading_updated() {
		return last_reading_updated;
	}
	public void setLast_reading_updated(String last_reading_updated) {
		this.last_reading_updated = last_reading_updated;
	}
	public String getLast_reading_updated_dg() {
		return last_reading_updated_dg;
	}
	public void setLast_reading_updated_dg(String last_reading_updated_dg) {
		this.last_reading_updated_dg = last_reading_updated_dg;
	}
	public String getNotify_load() {
		return notify_load;
	}
	public void setNotify_load(String notify_load) {
		this.notify_load = notify_load;
	}
	public String getNotification_sms() {
		return notification_sms;
	}
	public void setNotification_sms(String notification_sms) {
		this.notification_sms = notification_sms;
	}
	public String getNotification_email() {
		return notification_email;
	}
	public void setNotification_email(String notification_email) {
		this.notification_email = notification_email;
	}
	public String getNotify_balance() {
		return notify_balance;
	}
	public void setNotify_balance(String notify_balance) {
		this.notify_balance = notify_balance;
	}
	public String getNotify_energy_source() {
		return notify_energy_source;
	}
	public void setNotify_energy_source(String notify_energy_source) {
		this.notify_energy_source = notify_energy_source;
	}
	public String getNotify_consumption() {
		return notify_consumption;
	}
	public void setNotify_consumption(String notify_consumption) {
		this.notify_consumption = notify_consumption;
	}
	public String getLow_bal_alert() {
		return low_bal_alert;
	}
	public void setLow_bal_alert(String low_bal_alert) {
		this.low_bal_alert = low_bal_alert;
	}
	public String getGrid_load_alarm() {
		return grid_load_alarm;
	}
	public void setGrid_load_alarm(String grid_load_alarm) {
		this.grid_load_alarm = grid_load_alarm;
	}
	public String getDg_load_alarm() {
		return dg_load_alarm;
	}
	public void setDg_load_alarm(String dg_load_alarm) {
		this.dg_load_alarm = dg_load_alarm;
	}
	public Double getAlert_dg_consumption() {
		return alert_dg_consumption;
	}
	public void setAlert_dg_consumption(Double alert_dg_consumption) {
		this.alert_dg_consumption = alert_dg_consumption;
	}
	public Double getAlert_grid_consumption() {
		return alert_grid_consumption;
	}
	public void setAlert_grid_consumption(Double alert_grid_consumption) {
		this.alert_grid_consumption = alert_grid_consumption;
	}
	public String getLoad_setting_enabled() {
		return load_setting_enabled;
	}
	public void setLoad_setting_enabled(String load_setting_enabled) {
		this.load_setting_enabled = load_setting_enabled;
	}
	public String getDg_sanctioned_load() {
		return dg_sanctioned_load;
	}
	public void setDg_sanctioned_load(String dg_sanctioned_load) {
		this.dg_sanctioned_load = dg_sanctioned_load;
	}
	public String getGrid_sanctioned_load() {
		return grid_sanctioned_load;
	}
	public void setGrid_sanctioned_load(String grid_sanctioned_load) {
		this.grid_sanctioned_load = grid_sanctioned_load;
	}
	public String getGrid_overload_setting() {
		return grid_overload_setting;
	}
	public void setGrid_overload_setting(String grid_overload_setting) {
		this.grid_overload_setting = grid_overload_setting;
	}
	public String getDg_overload_setting() {
		return dg_overload_setting;
	}
	public void setDg_overload_setting(String dg_overload_setting) {
		this.dg_overload_setting = dg_overload_setting;
	}
	public String getGrid_overload_from_time() {
		return grid_overload_from_time;
	}
	public void setGrid_overload_from_time(String grid_overload_from_time) {
		this.grid_overload_from_time = grid_overload_from_time;
	}
	public String getGrid_overload_to_time() {
		return grid_overload_to_time;
	}
	public void setGrid_overload_to_time(String grid_overload_to_time) {
		this.grid_overload_to_time = grid_overload_to_time;
	}
	public String getDg_overload_from_time() {
		return dg_overload_from_time;
	}
	public void setDg_overload_from_time(String dg_overload_from_time) {
		this.dg_overload_from_time = dg_overload_from_time;
	}
	public String getDg_overload_to_time() {
		return dg_overload_to_time;
	}
	public void setDg_overload_to_time(String dg_overload_to_time) {
		this.dg_overload_to_time = dg_overload_to_time;
	}
	public String getSupport_name() {
		return support_name;
	}
	public void setSupport_name(String support_name) {
		this.support_name = support_name;
	}
	public String getSupport_contact_no() {
		return support_contact_no;
	}
	public void setSupport_contact_no(String support_contact_no) {
		this.support_contact_no = support_contact_no;
	}
	public String getSupport_email() {
		return support_email;
	}
	public void setSupport_email(String support_email) {
		this.support_email = support_email;
	}
	public String getSupervisor_name() {
		return supervisor_name;
	}
	public void setSupervisor_name(String supervisor_name) {
		this.supervisor_name = supervisor_name;
	}
	public String getSupervisor_contact_no() {
		return supervisor_contact_no;
	}
	public void setSupervisor_contact_no(String supervisor_contact_no) {
		this.supervisor_contact_no = supervisor_contact_no;
	}
	public String getSupervisor_email() {
		return supervisor_email;
	}
	public void setSupervisor_email(String supervisor_email) {
		this.supervisor_email = supervisor_email;
	}
	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	public Double getDaily_dg_unit() {
		return daily_dg_unit;
	}
	public void setDaily_dg_unit(Double daily_dg_unit) {
		this.daily_dg_unit = daily_dg_unit;
	}
	public Double getDaily_grid_unit() {
		return daily_grid_unit;
	}
	public void setDaily_grid_unit(Double daily_grid_unit) {
		this.daily_grid_unit = daily_grid_unit;
	}
	public Double getMonthly_grid_unit() {
		return monthly_grid_unit;
	}
	public void setMonthly_grid_unit(Double monthly_grid_unit) {
		this.monthly_grid_unit = monthly_grid_unit;
	}
	public Double getMonthly_dg_unit() {
		return monthly_dg_unit;
	}
	public void setMonthly_dg_unit(Double monthly_dg_unit) {
		this.monthly_dg_unit = monthly_dg_unit;
	}

	public Double getDaily_dg_amount() {
		return daily_dg_amount;
	}
	public void setDaily_dg_amount(Double daily_dg_amount) {
		this.daily_dg_amount = daily_dg_amount;
	}
	public Double getDaily_grid_amount() {
		return daily_grid_amount;
	}
	public void setDaily_grid_amount(Double daily_grid_amount) {
		this.daily_grid_amount = daily_grid_amount;
	}
	public Double getMonthly_dg_amount() {
		return monthly_dg_amount;
	}
	public void setMonthly_dg_amount(Double monthly_dg_amount) {
		this.monthly_dg_amount = monthly_dg_amount;
	}
	public Double getMonthly_grid_amount() {
		return monthly_grid_amount;
	}
	public void setMonthly_grid_amount(Double monthly_grid_amount) {
		this.monthly_grid_amount = monthly_grid_amount;
	}

	public String getDisplay_load_setting_screen() {
		return display_load_setting_screen;
	}
	public void setDisplay_load_setting_screen(String display_load_setting_screen) {
		this.display_load_setting_screen = display_load_setting_screen;
	}
	public String getReading_unit() {
		return reading_unit;
	}
	public void setReading_unit(String reading_unit) {
		this.reading_unit = reading_unit;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getOverload_grid() {
		return overload_grid;
	}
	public void setOverload_grid(String overload_grid) {
		this.overload_grid = overload_grid;
	}
	public String getOverload_dg() {
		return overload_dg;
	}
	public void setOverload_dg(String overload_dg) {
		this.overload_dg = overload_dg;
	}
	public void setEnergy_source(String energy_source) {
		this.energy_source = energy_source;
	}
	public String getEnergy_source() {
		return energy_source;
	}
	public String getMonthly_bill_enable() {
		return monthly_bill_enable;
	}
	public void setMonthly_bill_enable(String monthly_bill_enable) {
		this.monthly_bill_enable = monthly_bill_enable;
	}
	public String getDevice_app_ver() {
		return device_app_ver;
	}
	public void setDevice_app_ver(String device_app_ver) {
		this.device_app_ver = device_app_ver;
	}
	public String getAndroid_version() {
		return android_version;
	}
	public void setAndroid_version(String android_version) {
		this.android_version = android_version;
	}
	
	
	//***** Method *****//
	
	public void convertJSON2Resource(JSONObject obj) {
		System.out.println(obj);
		try {
			if (obj.get("flat_number") != null) {
				setFlat_number(obj.getString("flat_number"));
			}
			if (obj.get("PLM") != null) {
				setPlm(obj.getString("PLM"));
			}
			if (obj.get("consumer_name") != null) {
				setConsumer_name(obj.getString("consumer_name"));
			}
			if (obj.get("consumer_mobile_no") != null) {
				setMobile_no(obj.getString("consumer_mobile_no"));
			}
			if (obj.get("consumer_email_id") != null) {
				setEmail_id(obj.getString("consumer_email_id"));
			}
			if (obj.get("balance_amount") != null) {
				setBalance_amount(obj.getString("balance_amount"));
			}
			if (obj.get("last_recharge_time") != null) {
				setRecharge_time(obj.getString("last_recharge_time"));
			}
			if (obj.get("dg_reading") != null) {
				setDg_reading(obj.getString("dg_reading"));
			}
			if (obj.get("grid_reading") != null) {
				setGrid_reading(obj.getString("grid_reading"));
			}
			if (obj.get("last_reading_updated") != null) {
				setLast_reading_updated(obj.getString("last_reading_updated"));
			}
			if (obj.get("last_reading_updated_dg") != null) {
				setLast_reading_updated_dg(obj.getString("last_reading_updated_dg"));
			}
			if (obj.get("notification_app_load") != null) {
				setNotify_load(obj.getString("notification_app_load"));
			}
			if (obj.get("notification_sms") != null) {
				setNotification_sms(obj.getString("notification_sms"));
			}
			if (obj.get("notification_email") != null) {
				setNotification_email(obj.getString("notification_email"));
			}
			if (obj.get("notification_app_balance") != null) {
				setNotify_balance(obj.getString("notification_app_balance"));
			}
			if (obj.get("notification_app_esource") != null) {
				setNotify_energy_source(obj.getString("notification_app_esource"));
			}
			if (obj.get("notification_app_unit_consumption") != null) {
				setNotify_consumption(obj.getString("notification_app_unit_consumption"));
			}
			if (obj.get("low_bal_alert") != null) {
				setLow_bal_alert(obj.getString("low_bal_alert"));
			}
			if (obj.get("dg_load_alarm") != null) {
				setDg_load_alarm(obj.getString("dg_load_alarm"));
			}
			if (obj.get("grid_load_alarm") != null) {
				setGrid_load_alarm(obj.getString("grid_load_alarm"));
			}
			if (obj.get("alert_daily_consumption_dg") != null) {
				setAlert_dg_consumption(Double.parseDouble(obj.getString("alert_daily_consumption_dg").replaceAll(",", "")));
			}
			if (obj.get("alert_daily_consumption_grid") != null) {
				setAlert_grid_consumption(Double.parseDouble(obj.getString("alert_daily_consumption_grid").replaceAll(",", "")));
			}
			if (obj.get("load_setting_enabled") != null) {
				setLoad_setting_enabled(obj.getString("load_setting_enabled"));
			}
			if (obj.get("grid_sanctioned_load") != null) {
				setGrid_sanctioned_load(obj.getString("grid_sanctioned_load"));
			}
			if (obj.get("dg_sanctioned_load") != null) {
				setDg_sanctioned_load(obj.getString("dg_sanctioned_load"));
			}
			if (obj.get("grid_overload_setting") != null) {
				setGrid_overload_setting(obj.getString("grid_overload_setting"));
			}
			if (obj.get("dg_overload_setting") != null) {
				setDg_overload_setting(obj.getString("dg_overload_setting"));
			}
			if (obj.get("grid_overload_from_time") != null) {
				setGrid_overload_from_time(obj.getString("grid_overload_from_time"));
			}
			if (obj.get("grid_overload_to_time") != null) {
				setGrid_overload_to_time(obj.getString("grid_overload_to_time"));
			}
			if (obj.get("dg_overload_from_time") != null) {
				setDg_overload_from_time(obj.getString("dg_overload_from_time"));
			}
			if (obj.get("dg_overload_to_time") != null) {
				setDg_overload_to_time(obj.getString("dg_overload_to_time"));
			}
			if (obj.get("site_supervisor_name") != null) {
				setSupervisor_name(obj.getString("site_supervisor_name"));
			}
			if (obj.get("site_supervisor_contact_no") != null) {
				setSupervisor_contact_no(obj.getString("site_supervisor_contact_no"));
			}
			if (obj.get("site_supervisor_email_id") != null) {
				setSupervisor_email(obj.getString("site_supervisor_email_id"));
			}
			if (obj.get("site_support_concern_name") != null) {
				setSupport_name(obj.getString("site_support_concern_name"));
			}
			if (obj.get("site_support_contact_no") != null) {
				setSupport_contact_no(obj.getString("site_support_contact_no"));
			}
			if (obj.get("site_support_email_id") != null) {
				setSupport_email(obj.getString("site_support_email_id"));
			}
			if (obj.get("application") != null) {
				setApplication(obj.getString("application"));
			}
			if (obj.get("display_load_setting_screen") != null) {
				setDisplay_load_setting_screen(obj.getString("display_load_setting_screen"));
			}
			if (obj.get("daily_dg_unit") != null) {
				setDaily_dg_unit(Double.parseDouble(obj.getString("daily_dg_unit").replaceAll(",", "")));
			}
			if (obj.get("daily_grid_unit") != null) {
				setDaily_grid_unit(Double.parseDouble(obj.getString("daily_grid_unit").replaceAll(",", "")));
			}
			if (obj.get("monthly_dg_unit") != null) {
				setMonthly_dg_unit(Double.parseDouble(obj.getString("monthly_dg_unit").replaceAll(",", "")));
			}
			if (obj.get("monthly_grid_unit") != null) {
				setMonthly_grid_unit(Double.parseDouble(obj.getString("monthly_grid_unit").replaceAll(",", "")));
			}
			if (obj.get("daily_dg_amount") != null) {
				setDaily_dg_amount(Double.parseDouble(obj.getString("daily_dg_amount").replaceAll(",", "")));
			}
			if (obj.get("daily_grid_amount") != null) {
				setDaily_grid_amount(Double.parseDouble(obj.getString("daily_grid_amount").replaceAll(",", "")));
			}
			if (obj.get("monthly_dg_amount") != null) {
				setMonthly_dg_amount(Double.parseDouble(obj.getString("monthly_dg_amount").replaceAll(",", "")));
			}
			if (obj.get("monthly_grid_amount") != null) {
				setMonthly_grid_amount(Double.parseDouble(obj.getString("monthly_grid_amount").replaceAll(",", "")));
			}
			if (obj.get("reading_unit") != null) {
				setReading_unit(obj.getString("reading_unit"));
			}
			if (obj.get("currency") != null) {
				setCurrency(obj.getString("currency"));
			}
			if (obj.get("overload_grid") != null) {
				setOverload_grid(obj.getString("overload_grid"));
			}
			if (obj.get("overload_dg") != null) {
				setOverload_dg(obj.getString("overload_dg"));
			}
			if (obj.get("energy_source") != null) {
				setEnergy_source(obj.getString("energy_source"));
			}
			if (obj.get("monthly_bill_enable") != null) {
				setMonthly_bill_enable(obj.getString("monthly_bill_enable"));
			}
            if (obj.get("monthly_bill_no_of_month") != null) {
                setMonthly_bill_no_of_month(obj.getInt("monthly_bill_no_of_month"));
            }
			if (obj.get("device_app_ver") != null) {
				setDevice_app_ver(obj.getString("device_app_ver"));
			}
			if (obj.get("android_version") != null) {
				setAndroid_version(obj.getString("android_version"));
			}
			if (obj.get("load_unit") != null) {
				setLoad_unit(obj.getString("load_unit"));
			}
			if (obj.get("power_cut_restore_notification") != null) {
				setPower_cut_restore_notification(obj.getString("power_cut_restore_notification"));
			}
			if (obj.get("notification_app_esource") != null) {
				setSource_change_notification(obj.getString("notification_app_esource"));
			}
			if (obj.get("recharge_notification") != null) {
				setRecharge_notification(obj.getString("recharge_notification"));
			}
			if (obj.get("paytm_mobile_url") != null) {
				setPaytm_mobile_url(obj.getString("paytm_mobile_url"));
			}
			if (obj.get("recharge_popup_message") != null) {
                setRecharge_popup_message(obj.getString("recharge_popup_message"));
            }
            if (obj.get("mobikwik_mobile_url") != null) {
				setMobikwik_mobile_url(obj.getString("mobikwik_mobile_url"));
			}
			if (obj.get("fix_charges") != null) {
				setFix_charges(Double.parseDouble(obj.getString("fix_charges").replaceAll(",", "")));
			}
			if (obj.get("dr_cr") != null) {
				setDr_cr(Double.parseDouble(obj.getString("dr_cr").replaceAll(",", "")));
			}
			if (obj.get("fix_charges_monthly") != null) {
				setFix_charges_monthly(Double.parseDouble(obj.getString("fix_charges_monthly").replaceAll(",", "")));
			}
			if (obj.get("dr_cr_monthly") != null) {
				setDr_cr_monthly(Double.parseDouble(obj.getString("dr_cr_monthly").replaceAll(",", "")));
			}
			if (obj.get("site_code") != null) {
				setSite_code(obj.getString("site_code"));
			}
			if (obj.get("pg_enable_paytm") != null) {
				setPg_enable_paytm(obj.getString("pg_enable_paytm"));
			}
			if (obj.get("pg_enable_mobikwik") != null) {
				setPg_enable_mobikwik(obj.getString("pg_enable_mobikwik"));
			}
			if (obj.get("pg_enable_hdfc") != null) {
				setPg_enable_hdfc(obj.getString("pg_enable_hdfc"));
			}
			if (obj.get("site_id") != null) {
				setSite_id(obj.getString("site_id"));
			}
			if (obj.get("site_name") != null) {
				setSite_name(obj.getString("site_name"));
			}
			if (obj.get("site_address") != null) {
				setSite_address(obj.getString("site_address"));
			}
			if (obj.get("site_city") != null) {
				setSite_city(obj.getString("site_city"));
			}
			if (obj.get("site_state") != null) {
				setSite_state(obj.getString("site_state"));
			}
			if (obj.get("site_country") != null) {
				setSite_country(obj.getString("site_country"));
			}
			if (obj.get("site_zipcode") != null) {
				setSite_zipcode(obj.getString("site_zipcode"));
			}

		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

}
