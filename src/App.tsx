import { useState, useEffect } from 'react';
import { ActivePage } from './types';
import { TopNavigation } from './components/TopNavigation';
import { Level3Sidebar } from './components/Level3Sidebar';
import { AppTheme } from './components/Header';
import { LoginView } from './components/LoginView';
import { Workbench } from './components/Workbench';
import { AppointmentKanban } from './components/AppointmentKanban';
import { UserManagement } from './components/UserManagement';
import { StaffManagement } from './components/StaffManagement';
import { ServiceManagement } from './components/service/ServiceManagement';
import { ProductManagement } from './components/product/ProductManagement';
import { TradeManagement } from './components/trade/TradeManagement';
import { OperationsManagement } from './components/operations/OperationsManagement';
import { DietManagement } from './components/operations/DietManagement';
import { HealthNewsManagement } from './components/operations/HealthNewsManagement';
import { DiseaseManagement } from './components/operations/DiseaseManagement';
import { InstitutionManagement } from './components/operations/InstitutionManagement';
import { LectureManagement } from './components/operations/LectureManagement';
import { CommentManagement } from './components/operations/CommentManagement';
import { FoodManagement } from './components/operations/FoodManagement';
import { AssessmentManagement } from './components/operations/AssessmentManagement';
import { CareOrdersManagement } from './components/CareOrdersManagement';
import { VideoMonitoring } from './components/VideoMonitoring';
import { FinanceManagement } from './components/FinanceManagement';
import { AnalyticsReports } from './components/AnalyticsReports';
import { SystemSettings } from './components/SystemSettings';
import { DataAnalyticsManagement } from './components/data/DataAnalyticsManagement';
import { X, AlertTriangle } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: '系统超级管理员',
    role: '系统超级管理员',
    email: 'admin@elderlycare.gov.cn',
  });
  const [activePage, setActivePage] = useState<ActivePage>('ops_food_list');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('teal');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const showNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleConfirmDelete = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'workbench':
        return (
          <Workbench
            onNotice={showNotice}
            onNavigateToAppointment={() => setActivePage('appointment')}
            onNavigateToPage={(page) => setActivePage(page)}
          />
        );
      case 'appointment':
        return <AppointmentKanban onNotice={showNotice} />;
      case 'user_list':
      case 'user_tags':
      case 'user_reports':
      case 'user_levels':
      case 'msg_broadcast':
      case 'msg_chat':
      case 'market_coupons':
      case 'market_points':
      case 'market_growth':
      case 'elderly_list':
      case 'health_records':
        return <UserManagement onNotice={showNotice} subPage={activePage} />;
      case 'staff_list':
      case 'staff_schedule':
      case 'service_staff_list':
      case 'service_staff_tags':
      case 'service_staff_audit':
      case 'service_work_orders':
      case 'service_commission':
      case 'service_tips':
      case 'service_order_settings':
        return <ServiceManagement onNotice={showNotice} subPage={activePage} />;
      case 'product_housekeeping_goods':
      case 'product_housekeeping_cats':
      case 'product_rehab_goods':
      case 'product_rehab_items':
      case 'product_checkup_goods':
      case 'product_checkup_cats':
      case 'product_settings_params':
      case 'product_settings_general':
        return <ProductManagement onNotice={showNotice} subPageId={activePage} />;

      // Trade (交易) Sub-modules
      case 'trade_all_orders':
      case 'trade_order_detail':
      case 'trade_after_sales':
      case 'trade_reviews':
      case 'trade_withdrawals':
      case 'trade_statements':
      case 'trade_refund_reasons':
      case 'trade_general_settings':
        return (
          <TradeManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      // Operations Sub-modules
      case 'ops_life_dynamics':
      case 'ops_life_topics':
      case 'ops_life_banners':
      case 'ops_activity_list':
      case 'ops_activity_registrations':
      case 'ops_activity_fields':
        return <OperationsManagement onNotice={showNotice} subPageId={activePage} />;

      case 'ops_diet_recipes':
      case 'ops_diet_tags':
        return (
          <DietManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_news_list':
        return (
          <HealthNewsManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_disease_list':
      case 'ops_disease_cats':
        return (
          <DiseaseManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_institution_list':
      case 'ops_institution_tags':
        return (
          <InstitutionManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_lecture_videos':
      case 'ops_lecture_tags':
        return (
          <LectureManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_comments_all':
        return (
          <CommentManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_food_list':
      case 'ops_food_cats':
        return (
          <FoodManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'ops_assessment_list':
        return (
          <AssessmentManagement
            subPageId={activePage}
            onNotice={showNotice}
            onConfirmDelete={handleConfirmDelete}
          />
        );

      case 'data_user_overview':
      case 'data_user_age':
      case 'data_user_gender':
      case 'data_user_social':
      case 'data_trade_overview':
      case 'data_product_analysis':
      case 'data_repurchase_analysis':
      case 'data_workorder_analysis':
      case 'data_performance_stats':
      case 'data_review_stats':
        return (
          <DataAnalyticsManagement
            subPageId={activePage}
            onNotice={showNotice}
          />
        );

      case 'service_orders':
      case 'care_plans':
        return <CareOrdersManagement onNotice={showNotice} subPage={activePage} />;
      case 'video_monitor':
      case 'alarm_events':
        return <VideoMonitoring onNotice={showNotice} subPage={activePage} />;
      case 'order_bills':
      case 'insurance_settlement':
        return <FinanceManagement onNotice={showNotice} subPage={activePage} />;
      case 'operation_stats':
      case 'elderly_portrait':
        return <AnalyticsReports onNotice={showNotice} subPage={activePage} />;
      case 'org_settings':
      case 'audit_logs':
      case 'sys_staff':
      case 'sys_staff_form':
      case 'sys_roles':
      case 'sys_role_form':
      case 'sys_drug_units':
      case 'sys_protocols':
      case 'sys_logs':
      case 'sys_profile':
      case 'sys_reset_pwd':
        return (
          <SystemSettings
            onNotice={showNotice}
            subPage={activePage}
            onNavigate={(page) => setActivePage(page)}
            onConfirmDelete={handleConfirmDelete}
          />
        );
      default:
        return (
          <Workbench
            onNotice={showNotice}
            onNavigateToAppointment={() => setActivePage('appointment')}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginView
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }}
        onNotice={showNotice}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[var(--app-bg)] text-[var(--text-main)] font-sans antialiased transition-colors duration-250">
      {/* Unified Top Navigation */}
      <TopNavigation
        activePage={activePage}
        onPageChange={(page) => setActivePage(page)}
        onNotice={showNotice}
        currentUser={currentUser}
        currentTheme={currentTheme}
        onThemeChange={(theme) => setCurrentTheme(theme)}
        onLogout={() => {
          setIsLoggedIn(false);
          showNotice('已安全退出控制台');
        }}
      />

      {/* Main Body Area: Level 3 Left Sidebar (三级菜单放左侧) + Dynamic Content Page */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <Level3Sidebar
          activePage={activePage}
          onPageChange={(page) => setActivePage(page)}
          onNotice={showNotice}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 bg-[#eaf4ef]">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-200/80 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900">{confirmModal.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{confirmModal.message}</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-100 text-xs">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg font-medium transition-colors"
              >
                取消
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors shadow-xs"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating System Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-8 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center space-x-2.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
