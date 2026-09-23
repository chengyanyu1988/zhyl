import React from 'react';
import { SubPageId } from '../../types';
import { ServiceStaffList } from './ServiceStaffList';
import { ServiceWorkOrders } from './ServiceWorkOrders';
import { ServiceCommission } from './ServiceCommission';
import { ServiceStaffTags } from './ServiceStaffTags';
import { ServiceStaffAudit } from './ServiceStaffAudit';
import { ServiceTipsAndSettings } from './ServiceTipsAndSettings';

interface ServiceManagementProps {
  subPage: SubPageId;
  onNotice: (msg: string) => void;
}

export const ServiceManagement: React.FC<ServiceManagementProps> = ({ subPage, onNotice }) => {
  switch (subPage) {
    case 'service_staff_list':
    case 'staff_list':
      return <ServiceStaffList onNotice={onNotice} />;
    case 'service_staff_tags':
      return <ServiceStaffTags onNotice={onNotice} />;
    case 'service_staff_audit':
      return <ServiceStaffAudit onNotice={onNotice} />;
    case 'service_work_orders':
      return <ServiceWorkOrders onNotice={onNotice} />;
    case 'service_commission':
      return <ServiceCommission onNotice={onNotice} />;
    case 'service_tips':
      return <ServiceTipsAndSettings type="tips" onNotice={onNotice} />;
    case 'service_order_settings':
      return <ServiceTipsAndSettings type="settings" onNotice={onNotice} />;
    default:
      return <ServiceStaffList onNotice={onNotice} />;
  }
};
