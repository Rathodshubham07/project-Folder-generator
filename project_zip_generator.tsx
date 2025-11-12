import React, { useState, useEffect } from 'react';
import { Download, FolderTree } from 'lucide-react';

const ProjectZipGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [projectName, setProjectName] = useState('ProjectName');
  const [status, setStatus] = useState('');
  const [jsZipLoaded, setJsZipLoaded] = useState(false);

  useEffect(() => {
    const loadJSZip = async () => {
      try {
        if (window.JSZip) {
          setJsZipLoaded(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.async = true;
        
        script.onload = () => setJsZipLoaded(true);
        script.onerror = () => setStatus('Error loading. Please refresh.');
        
        document.body.appendChild(script);
      } catch (err) {
        setStatus('Error. Please refresh the page.');
      }
    };

    loadJSZip();
  }, []);

  const generateZip = async () => {
    if (!jsZipLoaded || !projectName.trim()) return;

    setGenerating(true);
    setStatus('Generating...');

    try {
      const zip = new window.JSZip();
      const date = new Date().toISOString().split('T')[0];

      const structure = {
        '01_Project_Info': {
          'Project_Details.txt': `Project Name: ${projectName}
Date Created: ${date}
Status: Active

Project Overview:
[Add project description here]

Scope:
- Item 1
- Item 2

Objectives:
- Objective 1
- Objective 2`,

          'Contact_List.txt': `PROJECT CONTACTS - ${projectName}

INTERNAL TEAM:
Project Manager: [Name] | [Email] | [Phone]
Lead Engineer: [Name] | [Email] | [Phone]
Controls Engineer: [Name] | [Email] | [Phone]
IT/Network Engineer: [Name] | [Email] | [Phone]

CLIENT CONTACTS:
Primary Contact: [Name] | [Email] | [Phone]
Technical Contact: [Name] | [Email] | [Phone]
Site Manager: [Name] | [Email] | [Phone]

VENDORS:
PLC/HMI Supplier: [Name] | [Contact]
SCADA Supplier: [Name] | [Contact]
MES Supplier: [Name] | [Contact]`,

          'Schedule.xlsx': '# Project Schedule - Create in Excel\n# Columns: Task, Start Date, End Date, Status, Owner'
        },

        '02_L1_PLC_HMI': {
          'PLC': {
            'Program_Backup': {
              'PLC_Project_v01.zip': '# PLC Program Archive - Version 1\n# Export your PLC project here'
            },
            'IO_List.xlsx': `# I/O List
# Columns: Tag Name, Description, I/O Type, Address, Device, Rack/Slot, Notes
# Example:
# DI_EmergencyStop, Emergency Stop Button, Digital Input, %I0.0, Safety Module, Rack 1 Slot 2, Normally Closed`,
            
            'PLC_Notes.txt': `PLC CONFIGURATION NOTES

Platform: [Siemens/Allen Bradley/Mitsubishi]
Model: [S7-1500/ControlLogix/iQ-F]
CPU: [Part Number]
Firmware Version: [Version]

Network Configuration:
IP Address: 192.168.1.10
Subnet Mask: 255.255.255.0
Gateway: 192.168.1.1

Scan Time: [X ms]

Special Notes:
- Add any special configurations here
- Safety functions
- Custom function blocks
- Communication settings`
          },

          'HMI': {
            'Screens_Backup': {
              'HMI_Project_v01.zip': '# HMI Project Archive - Version 1\n# Export your HMI project here'
            },
            'HMI_Tag_List.xlsx': `# HMI Tag List
# Columns: Tag Name, Description, Data Type, PLC Address, Screen Location, Alarm Limits
# Example tags for reference`
          },

          'Field_Devices': {
            'Sensor_List.xlsx': `# Field Devices List
# Columns: Tag, Device Type, Make/Model, Location, I/O Address, Calibration Date, Notes
# Example:
# PT_101, Pressure Transmitter, Endress+Hauser, Tank 1, %IW64, 2024-01-15, 0-100 PSI`,
            
            'Field_Wiring.txt': `FIELD WIRING NOTES

Cable Types:
- Digital I/O: Shielded 18 AWG
- Analog: Shielded twisted pair 20 AWG
- Ethernet: Cat6 STP

Termination:
- All shields grounded at panel end only
- Use ferrules for all connections
- Label all cables at both ends

Special Wiring:
[Add any special wiring requirements]`
          }
        },

        '03_L2_Supervisory': {
          'Kepware': {
            'Kepware_Tags.xlsx': `# Kepware Tag Configuration
# Columns: Tag Name, Device, PLC Address, Data Type, Scan Rate, Scaling, Description`,
            
            'Kepware_Config_Backup.opf': '# Kepware Configuration Backup\n# Export from Kepware Administration',
            
            'Kepware_Notes.txt': `KEPWARE CONFIGURATION

Version: [KEPServerEX Version]
License: [License Type]

Devices Configured:
- PLC_Line1: Allen Bradley, IP: 192.168.1.10
- PLC_Line2: Siemens, IP: 192.168.1.11

OPC UA Settings:
Endpoint: opc.tcp://localhost:49320
Security: Sign & Encrypt

Client Connections:
- Historian (OPC DA)
- iFIX SCADA (OPC UA)
- MES System (REST API)

Performance:
Update Rate: 100ms
Optimization Method: [Method]`
          },

          'Historian': {
            'Historian_Tags.xlsx': `# Historian Tag List
# Columns: Tag Name, Source, Logging Type, Deadband, Compression, Retention Period
# Logging Types: On Change, Periodic, On Alarm`,
            
            'Historian_Trend_Notes.txt': `HISTORIAN CONFIGURATION

Platform: [Wonderware/OSIsoft/Canary]
Server: HistorianServer01
Database: ProductionDB

Trending Configuration:
- High frequency tags: 1 second logging
- Process values: 5 second on-change
- Totals: 1 minute periodic

Retention Policy:
- Raw data: 90 days
- Aggregated data: 2 years
- Compliance data: 7 years

Key Trends:
1. Production Rate (tags: ProdRate_L1, ProdRate_L2)
2. Quality Metrics (tags: Quality_*)
3. Equipment Status (tags: Equip_Status_*)
4. Energy Consumption (tags: Energy_*)`
          },

          'iFIX': {
            'SCU_Config_Backup.zip': '# iFIX SCU Configuration Backup\n# System Configuration Utility export',
            
            'iFIX_Screenshots': {
              'README.txt': '# Store iFIX screen screenshots here\n# Organize by screen name'
            },
            
            'iFIX_Notes.txt': `iFIX SCADA CONFIGURATION

Version: [iFIX 6.5 / 2023]
Node Name: SCADA_Server01
SCADA: iFIX_Prod

Screens Developed:
1. Overview - Main production overview
2. Line1_Detail - Line 1 detailed view
3. Line2_Detail - Line 2 detailed view
4. Alarms - Central alarm management
5. Trends - Historical trending
6. Reports - Production reports

Database Configuration:
- Process Database: PRODUCTION.PDB
- Alarm Database: ALARMS.PDB
- Update Rate: 1 second

I/O Configuration:
- OPC Client to Kepware
- Scan rate: 100ms
- Deadband: 0.5%

User Security:
Administrator - Full access
Supervisor - Read/Write/Ack
Operator - Read/Ack only`
          },

          'L2_Integration.txt': `L2 SUPERVISORY LAYER INTEGRATION

Data Flow:
PLC → Kepware → Historian → iFIX → MES

Network Architecture:
- Control Network: 192.168.1.0/24 (PLCs, HMIs)
- SCADA Network: 192.168.10.0/24 (Kepware, Historian, iFIX)
- Business Network: 192.168.100.0/24 (MES, ERP)

Firewall Rules:
- PLC to Kepware: Port 44818 (EIP), 102 (S7)
- Kepware to Historian: Port 135, 49320 (OPC)
- iFIX to Kepware: Port 49320 (OPC UA)
- MES to Historian: Port 443 (HTTPS)

Redundancy:
- Kepware: Primary + Hot Standby
- Historian: Mirrored servers
- iFIX: Redundant SCADA nodes

Backup Schedule:
- Kepware config: Daily 2 AM
- Historian: Continuous replication
- iFIX: Weekly full backup Sunday 3 AM`
        },

        '04_L3_MES': {
          'MES_Config.txt': `MES CONFIGURATION

System: [MES Platform Name]
Version: [Version]
Server: MES_Server01

Integration Points:
1. L2 Historian - Production data collection
2. ERP System - Work orders, materials
3. Quality System - Test results
4. Maintenance System - Equipment status

Data Collection:
- Production counts (real-time)
- Downtime tracking (event-based)
- Quality results (batch-based)
- Material consumption (per order)

KPIs Tracked:
- OEE (Overall Equipment Effectiveness)
- Cycle Time
- First Pass Yield
- Downtime by Reason

Reports Generated:
- Shift Production Report
- Downtime Analysis
- Quality Dashboard
- Material Traceability`,

          'MES_DataFlow.xlsx': `# MES Data Flow Matrix
# Columns: Data Point, Source System, Target System, Frequency, Protocol, Validation Rules`,

          'SQL_Tables.txt': `MES DATABASE TABLES

Production_Orders
- OrderID, ProductCode, Quantity, StartTime, EndTime, Status

Production_Actual
- RecordID, OrderID, Timestamp, Quantity, Machine, Operator

Downtime_Events
- EventID, Machine, StartTime, EndTime, Reason, Category, Comments

Quality_Results
- TestID, OrderID, Parameter, Value, Spec_Min, Spec_Max, Result, Timestamp

Material_Consumption
- ConsumedID, OrderID, MaterialCode, Quantity, Lot, Timestamp

Equipment_Status
- StatusID, Machine, Status, Runtime, IdleTime, Timestamp`,

          'MES_Interface_Notes.txt': `MES INTERFACE SPECIFICATIONS

REST API Endpoints:
POST /api/production/start - Start production order
POST /api/production/complete - Complete production
POST /api/downtime/log - Log downtime event
GET /api/orders/active - Get active orders
POST /api/quality/submit - Submit quality results

Authentication: Bearer token (OAuth 2.0)
Data Format: JSON
Timeout: 30 seconds
Retry Logic: 3 attempts with exponential backoff

Real-time Data Push:
- Kepware → MES: Production counts every 5 seconds
- PLC → MES: Downtime events (immediate)
- Quality system → MES: Test results (per batch)

Scheduled Synchronization:
- ERP work orders: Every 15 minutes
- Material master data: Daily 1 AM
- Equipment calendar: Daily 2 AM`
        },

        '05_Testing_Commissioning': {
          'FAT_Report.txt': `FACTORY ACCEPTANCE TEST REPORT

Project: ${projectName}
Date: ${date}
Location: Factory
Test Engineer: [Name]

Test Objectives:
1. Verify all PLC logic functions correctly
2. Validate HMI screens and navigation
3. Test alarm functionality
4. Verify communication between systems

Test Results Summary:
Total Tests: [X]
Passed: [X]
Failed: [X]
Pending: [X]

Critical Issues: [None/List issues]

Sign-offs:
Customer: _____________ Date: _______
Engineer: _____________ Date: _______`,

          'SAT_Report.txt': `SITE ACCEPTANCE TEST REPORT

Project: ${projectName}
Date: ${date}
Location: Site
Test Engineer: [Name]

Test Objectives:
1. Verify system operation with actual equipment
2. Test integration with existing systems
3. Validate production sequence
4. Perform load testing

Test Results Summary:
Total Tests: [X]
Passed: [X]
Failed: [X]

Outstanding Items: [List]

Final Acceptance:
Customer: _____________ Date: _______
Project Manager: _____________ Date: _______`,

          'Test_Results.xlsx': `# Test Results Log
# Columns: Test ID, Description, Expected Result, Actual Result, Pass/Fail, Tester, Date, Notes`,

          'Site_Issues_Log.txt': `SITE ISSUES LOG

Issue #001
Date: ${date}
Severity: [High/Medium/Low]
Description: [Issue description]
Root Cause: [Analysis]
Resolution: [Solution applied]
Status: [Open/Closed]
Closed Date: [Date]

Issue #002
[Continue format...]`
        },

        '06_SOP_Operation': {
          'Startup_Procedure.txt': `STANDARD OPERATING PROCEDURE - SYSTEM STARTUP

Project: ${projectName}

PREREQUISITES:
- All personnel trained and authorized
- All safety systems verified operational
- Maintenance completed and signed off
- Materials and utilities available

STARTUP SEQUENCE:

1. PRE-START CHECKS (10 minutes)
   □ Verify all E-stops released
   □ Check all safety gates closed
   □ Verify utilities (air, power, network)
   □ Check for any active alarms
   □ Ensure work area is clear

2. SYSTEM POWER-UP (5 minutes)
   □ Turn on main disconnect
   □ Power up control panels
   □ Wait for PLC boot (2 min)
   □ Verify PLC RUN mode
   □ Start HMI/SCADA systems

3. COMMUNICATION CHECK (5 minutes)
   □ Verify PLC to HMI communication
   □ Check Kepware connections (green)
   □ Verify iFIX SCADA online
   □ Test MES connectivity
   □ Confirm Historian logging

4. EQUIPMENT INITIALIZATION (10 minutes)
   □ Home all servo axes
   □ Reset all sensors
   □ Prime pumps (if applicable)
   □ Test conveyor jog functions
   □ Verify all field devices online

5. SYSTEM READY CHECK (5 minutes)
   □ All systems showing READY status
   □ No active alarms
   □ Production order loaded in MES
   □ Quality parameters verified
   □ Operator logged in

6. START PRODUCTION
   □ Select production order on HMI
   □ Press START button
   □ Monitor first cycle completion
   □ Verify counts updating in MES
   □ Check quality measurements

NORMAL OPERATION MONITORING:
- Check HMI for alarms every hour
- Monitor production rate vs target
- Verify MES data logging
- Check equipment temperatures

EMERGENCY SHUTDOWN:
Press any E-stop button immediately if:
- Personnel safety at risk
- Equipment malfunction
- Fire or smoke
- Abnormal sounds or vibrations`,

          'Shutdown_Procedure.txt': `STANDARD OPERATING PROCEDURE - SYSTEM SHUTDOWN

Project: ${projectName}

NORMAL SHUTDOWN:

1. STOP PRODUCTION (5 minutes)
   □ Complete current production cycle
   □ Press STOP on HMI
   □ Wait for all motion to stop
   □ Verify all equipment at rest

2. EQUIPMENT SECURING (10 minutes)
   □ Retract all cylinders
   □ Park all axes at home position
   □ Stop all motors
   □ Close all valves
   □ Drain lines (if required)

3. SYSTEM LOGOUT (5 minutes)
   □ Close active production order in MES
   □ Save any unsaved data
   □ Log operator notes in system
   □ Log out of HMI

4. DATA VERIFICATION (5 minutes)
   □ Verify all production counts recorded
   □ Check MES data synchronized
   □ Confirm Historian data logged
   □ Review any alarms during shift

5. POWER DOWN (5 minutes)
   □ Close HMI/SCADA applications
   □ Leave PLCs running (unless extended shutdown)
   □ Turn off monitors
   □ Lock control panels

6. HANDOVER (10 minutes)
   □ Complete shift log
   □ Communicate issues to next shift
   □ Note any pending maintenance
   □ Secure work area

EMERGENCY SHUTDOWN:
If E-stop is pressed:
1. DO NOT RESET until area is verified safe
2. Notify supervisor immediately
3. Document reason for E-stop
4. Complete incident report
5. Wait for authorization to restart`,

          'Troubleshooting_Guide.txt': `TROUBLESHOOTING GUIDE

COMMON ISSUES AND SOLUTIONS

═══════════════════════════════════════════

ISSUE 1: System Won't Start

Symptoms:
- HMI shows "NOT READY"
- PLC in STOP mode
- No response to START button

Checks:
1. Verify all E-stops released (check HMI E-stop screen)
2. Check PLC mode - should be RUN (key switch position)
3. Verify safety circuit closed (safety relay indicators)
4. Check for active alarms (alarm screen)
5. Verify network connections (link LEDs on switches)

Solutions:
- Reset E-stops and safety circuit
- Switch PLC to RUN mode
- Clear alarms after resolving issues
- Check cable connections if network issue

═══════════════════════════════════════════

ISSUE 2: Communication Loss

Symptoms:
- HMI shows "Comm Error"
- Data not updating on screens
- Kepware showing red status
- MES not receiving data

Checks:
1. Ping PLC from SCADA PC (cmd: ping 192.168.1.10)
2. Check Kepware channel status (should be green)
3. Verify network switch status (power and link LEDs)
4. Check firewall settings (may block ports)
5. Verify IP addresses not changed

Solutions:
- Restart Kepware service if channel down
- Check and reconnect network cables
- Reboot network switch if no link lights
- Verify IP configuration hasn't changed
- Check for IP conflicts (duplicate addresses)

═══════════════════════════════════════════

ISSUE 3: MES Data Not Updating

Symptoms:
- Production counts not incrementing in MES
- Historian shows no new data
- iFIX reads PLC data but MES doesn't

Checks:
1. Verify Historian service running (Windows Services)
2. Check iFIX to Kepware OPC connection
3. Verify MES API connectivity (test endpoint)
4. Review MES interface logs for errors
5. Check database connectivity

Solutions:
- Restart Historian service
- Reconnect OPC client in iFIX
- Verify MES authentication token valid
- Clear MES interface queue if backed up
- Contact MES support if database issue

═══════════════════════════════════════════

ISSUE 4: High PLC Scan Time

Symptoms:
- PLC cycle time > 50ms (normal: 10-20ms)
- Sluggish response to inputs
- HMI updates slow

Checks:
1. Check PLC diagnostics for errors
2. Review watchdog timer status
3. Check for infinite loops in program
4. Verify no communication timeouts
5. Check memory usage

Solutions:
- Reset PLC if one-time spike
- Optimize program if consistent high scan
- Check for faulty communication module
- Reduce communication frequency if needed

═══════════════════════════════════════════

WHO TO CONTACT:

Local Issues (9AM-5PM):
Controls Engineer: [Phone]
IT Support: [Phone]

After Hours:
On-Call Engineer: [Phone]

Critical System Down:
Escalation: [Manager Phone]

Vendor Support:
PLC/HMI: [Support Number]
SCADA: [Support Number]
MES: [Support Number]`
        },

        '07_Versions_Backups': {
          'PLC_Version_Log.txt': `PLC VERSION HISTORY

Project: ${projectName}

═══════════════════════════════════════════
VERSION 1.0 - ${date}
Author: [Engineer Name]
Status: Released to Production

Changes:
- Initial release
- Basic production sequence implemented
- Safety interlocks added
- Manual mode functions

Testing:
[x] FAT Completed
[x] SAT Completed
[x] Approved by customer

Files:
- PLC_Project_v01.zip (in 02_L1_PLC_HMI/PLC/Program_Backup/)

═══════════════════════════════════════════
VERSION 0.9 - [Previous Date]
Author: [Engineer Name]
Status: Pre-release (Testing)

Changes:
- Development version
- Core logic implementation
- Initial HMI integration

Testing:
[x] Bench testing
[ ] FAT
[ ] SAT

═══════════════════════════════════════════

Notes:
- Always backup before making changes
- Test in simulation before downloading to PLC
- Document all changes in this log
- Keep at least 3 previous versions`,

          'HMI_Version_Log.txt': `HMI VERSION HISTORY

Project: ${projectName}

═══════════════════════════════════════════
VERSION 1.0 - ${date}
Author: [Engineer Name]
Status: Released to Production

Changes:
- All production screens completed
- Alarm management implemented
- User management configured
- Reports generation added

Screens:
1. Overview - Main status
2. Manual Control - Manual operations
3. Auto Mode - Automatic production
4. Alarms - Alarm list and acknowledge
5. Trends - Real-time trends
6. Reports - Shift reports

Testing:
[x] Screen navigation tested
[x] Alarm functions verified
[x] User access levels confirmed
[x] Customer approved

Files:
- HMI_Project_v01.zip (in 02_L1_PLC_HMI/HMI/Screens_Backup/)

═══════════════════════════════════════════`,

          'L2_L3_Backups': {
            'Backup_YYYYMMDD.zip': '# L2/L3 System Backups\n# Include: Kepware config, iFIX SCU, MES settings',
            'README.txt': `BACKUP SCHEDULE AND PROCEDURES

Daily Backups (Automated - 2 AM):
- Kepware configuration (.opf)
- iFIX database (.pdb)
- Historian configuration

Weekly Backups (Manual - Sunday):
- Complete iFIX SCU export
- MES database backup
- System configuration files

Monthly Backups (Archived):
- Full system image
- All configuration files
- Documentation updates

Retention:
- Daily: 30 days
- Weekly: 90 days
- Monthly: 1 year

Restore Procedure:
1. Stop affected services
2. Restore configuration files
3. Restart services
4. Verify system operation
5. Test critical functions`
          }
        },

        '08_Reference': {
          'Datasheets': {
            'README.txt': `EQUIPMENT DATASHEETS

Store manufacturer datasheets for:
- PLCs and I/O modules
- HMI panels
- Sensors and transmitters
- Motor drives and starters
- Network switches and cables
- Power supplies

Organization:
- Name files: [Manufacturer]_[Model]_Datasheet.pdf
- Example: Siemens_S7-1516_Datasheet.pdf`
          },

          'Manuals': {
            'README.txt': `REFERENCE MANUALS

Store user and programming manuals for:
- PLC programming software
- HMI development software
- SCADA configuration
- MES user guides
- Network equipment

Organization:
- Separate folders for each platform
- Include version number in filename`
          },

          'Standards.txt': `APPLICABLE STANDARDS AND CODES

Electrical Standards:
- NFPA 70 (National Electrical Code)
- IEC 61131-3 (PLC Programming)
- IEEE 1588 (Precision Time Protocol)

Safety Standards:
- ISO 13849 (Safety of Machinery)
- IEC 61508 (Functional Safety)
- OSHA 1910.147 (Lockout/Tagout)

Communication Standards:
- OPC UA (IEC 62541)
- EtherNet/IP (ODVA)
- PROFINET (IEC 61158)

Network Standards:
- ISO/IEC 11801 (Cabling)
- IEEE 802.3 (Ethernet)
- TIA-568 (Commercial Cabling)

Quality Standards:
- ISA-95 (Enterprise-Control Integration)
- ISA-88 (Batch Control)

Documentation:
- Store PDF copies in this folder
- Note revision dates and applicable sections`
        }
      };

      const addToZip = (obj, path = '') => {
        Object.keys(obj).forEach(key => {
          const currentPath = path ? `${path}/${key}` : key;
          const value = obj[key];
          
          if (typeof value === 'string') {
            zip.file(`${projectName}/${currentPath}`, value);
          } else if (typeof value === 'object') {
            addToZip(value, currentPath);
          }
        });
      };

      addToZip(structure);

      const blob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName}.zip`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      setStatus('Complete');
      setTimeout(() => setStatus(''), 2000);
      
    } catch (err) {
      setStatus('Error. Please try again.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="border-2 border-black">
          
          {/* Header */}
          <div className="border-b-2 border-black p-6 bg-black text-white">
            <div className="flex items-center gap-3">
              <FolderTree size={28} />
              <h1 className="text-2xl font-bold">Industrial Automation Project Structure</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            
            {/* Status */}
            {status && (
              <div className="mb-4 p-3 border border-black bg-gray-50">
                <p className="text-sm font-mono">{status}</p>
              </div>
            )}

            {/* Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">PROJECT NAME</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none font-mono"
                placeholder="ProjectName"
                disabled={generating}
              />
            </div>

            {/* Structure */}
            <div className="mb-6 border-2 border-black p-4">
              <h2 className="text-sm font-bold mb-3">FOLDER STRUCTURE</h2>
              <div className="font-mono text-xs overflow-x-auto">
                <pre className="whitespace-pre">{`${projectName}/
├─ 01_Project_Info/
├─ 02_L1_PLC_HMI/
│  ├─ PLC/
│  ├─ HMI/
│  └─ Field_Devices/
├─ 03_L2_Supervisory/
│  ├─ Kepware/
│  ├─ Historian/
│  ├─ iFIX/
│  └─ L2_Integration.txt
├─ 04_L3_MES/
├─ 05_Testing_Commissioning/
├─ 06_SOP_Operation/
├─ 07_Versions_Backups/
└─ 08_Reference/`}</pre>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={generateZip}
              disabled={generating || !projectName.trim() || !jsZipLoaded}
              className="w-full bg-black text-white py-4 font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black flex items-center justify-center gap-3 border-2 border-black"
            >
              <Download size={20} />
              {generating ? 'GENERATING...' : jsZipLoaded ? 'DOWNLOAD ZIP' : 'LOADING...'}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectZipGenerator;